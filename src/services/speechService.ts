// Web Speech & Audio Services for SmartPrepration

// Speech Recognition Type Definitions
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export class SpeechService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis | null = null;
  private isListening: boolean = false;
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private micStream: MediaStream | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const win = window as unknown as IWindow;
      const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        this.recognition = new SpeechRecognitionClass();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
      }
      if ('speechSynthesis' in window) {
        this.synthesis = window.speechSynthesis;
      }
    }
  }

  public isSpeechRecognitionSupported(): boolean {
    return this.recognition !== null;
  }

  public isSpeechSynthesisSupported(): boolean {
    return this.synthesis !== null;
  }

  // Start continuous speech-to-text
  public startListening(
    onTranscriptUpdate: (transcript: string, isFinal: boolean) => void,
    onError?: (err: any) => void
  ): boolean {
    if (!this.recognition) {
      if (onError) onError(new Error('Speech recognition not supported in this browser.'));
      return false;
    }

    try {
      if (this.isListening) {
        this.stopListening();
      }

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const combined = (finalTranscript + ' ' + interimTranscript).trim();
        onTranscriptUpdate(combined, finalTranscript.length > 0);
      };

      this.recognition.onerror = (event: any) => {
        // Silently handle "no-speech" as it is common during pauses
        if (event.error !== 'no-speech' && onError) {
          onError(event);
        }
      };

      this.recognition.onend = () => {
        // Auto-restart if we are still marked as active listening
        if (this.isListening) {
          try {
            this.recognition.start();
          } catch (e) {
            // Already started or busy
          }
        }
      };

      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (err) {
      console.warn('SpeechRecognition start error:', err);
      if (onError) onError(err);
      return false;
    }
  }

  public stopListening(): void {
    this.isListening = false;
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (err) {
        // Ignore
      }
    }
  }

  // Speak AI responses with voice synthesis
  public speakText(
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    onError?: () => void
  ): void {
    if (!this.synthesis) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel any previous active speech
    this.synthesis.cancel();

    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.98;
    utterance.pitch = 1.0;

    // Pick a high quality natural English voice if available
    const voices = this.synthesis.getVoices();
    const preferredVoice = voices.find(
      v => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('English')) && v.lang.startsWith('en')
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onError) onError();
    };

    this.synthesis.speak(utterance);
  }

  public stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  // Setup Web Audio Analyser for live visual waveforms
  public async initAudioAnalyser(stream?: MediaStream): Promise<AnalyserNode | null> {
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        this.audioContext = new AudioCtx();
      }

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      if (stream) {
        this.micStream = stream;
      } else if (!this.micStream) {
        this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }

      const source = this.audioContext.createMediaStreamSource(this.micStream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;
      source.connect(this.analyser);

      return this.analyser;
    } catch (err) {
      console.warn('Microphone audio analyser could not be initialized:', err);
      return null;
    }
  }

  public getAudioFrequencyData(): number[] {
    if (!this.analyser) {
      // Fallback synthetic wave simulation
      return Array.from({ length: 16 }, () => Math.floor(Math.random() * 40));
    }
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return Array.from(dataArray.slice(0, 16));
  }

  public cleanup(): void {
    this.stopListening();
    this.stopSpeaking();
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
    if (this.audioContext) {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
  }
}

export const speechService = new SpeechService();
