import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { AIInterviewerState } from '../../types';

interface AIInterviewer3DAvatarProps {
  state: AIInterviewerState;
  audioLevel?: number; // 0 to 1
  avatarName?: string;
  avatarTitle?: string;
}

export const AIInterviewer3DAvatar: React.FC<AIInterviewer3DAvatarProps> = ({
  state,
  audioLevel = 0,
  avatarName = 'Dr. Evelyn Vance',
  avatarTitle = 'Senior AI Technical Interviewer'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<AIInterviewerState>(state);
  const audioLevelRef = useRef<number>(audioLevel);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    audioLevelRef.current = audioLevel;
  }, [audioLevel]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 3.8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root Group
    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    // 1. Stylized Head Mesh
    const headGeo = new THREE.SphereGeometry(0.75, 32, 32);
    headGeo.scale(1, 1.18, 1);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      metalness: 0.85,
      roughness: 0.2,
      emissive: 0x0F172A,
      emissiveIntensity: 0.4
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    avatarGroup.add(headMesh);

    // 2. Visor / Neural Eye Display Band
    const visorGeo = new THREE.CylinderGeometry(0.76, 0.76, 0.22, 32, 1, true, -Math.PI / 3, (2 * Math.PI) / 3);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x06B6D4,
      emissive: 0x22D3EE,
      emissiveIntensity: 1.2,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.95
    });
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, 0.12, 0.05);
    headMesh.add(visorMesh);

    // 3. Mouth / Audio Waveform Slit
    const mouthGeo = new THREE.BoxGeometry(0.24, 0.03, 0.05);
    const mouthMat = new THREE.MeshStandardMaterial({
      color: 0x38BDF8,
      emissive: 0x0284C7,
      emissiveIntensity: 1.0
    });
    const mouthMesh = new THREE.Mesh(mouthGeo, mouthMat);
    mouthMesh.position.set(0, -0.32, 0.72);
    headMesh.add(mouthMesh);

    // 4. Subtle Audio Waveform Rings around Head
    const audioRingGeo = new THREE.TorusGeometry(1.05, 0.018, 16, 64);
    const audioRingMat = new THREE.MeshStandardMaterial({
      color: 0x38BDF8,
      emissive: 0x06B6D4,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.6
    });
    const audioRing = new THREE.Mesh(audioRingGeo, audioRingMat);
    audioRing.rotation.x = Math.PI / 2;
    avatarGroup.add(audioRing);

    // 5. Thinking Neural Orbiters
    const orbitCount = 40;
    const orbitGeo = new THREE.BufferGeometry();
    const orbitPos = new Float32Array(orbitCount * 3);
    for (let i = 0; i < orbitCount * 3; i += 3) {
      const angle = (i / (orbitCount * 3)) * Math.PI * 2;
      orbitPos[i] = Math.cos(angle) * 1.25;
      orbitPos[i + 1] = (Math.random() - 0.5) * 0.4;
      orbitPos[i + 2] = Math.sin(angle) * 1.25;
    }
    orbitGeo.setAttribute('position', new THREE.BufferAttribute(orbitPos, 3));
    const orbitMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x818CF8,
      transparent: true,
      opacity: 0.8
    });
    const orbitParticles = new THREE.Points(orbitGeo, orbitMat);
    avatarGroup.add(orbitParticles);

    // 6. Shoulders / Collar Base
    const collarGeo = new THREE.CylinderGeometry(0.85, 1.2, 0.5, 32);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0x0F172A,
      roughness: 0.5,
      metalness: 0.8
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.position.set(0, -1.05, 0);
    avatarGroup.add(collarMesh);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x38BDF8, 2.2);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x818CF8, 3, 10);
    rimLight.position.set(-2, 1, -2);
    scene.add(rimLight);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / height) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;
      const currentState = stateRef.current;

      // Base breathing oscillation
      avatarGroup.position.y = Math.sin(time * 1.5) * 0.04;

      // Head mouse look-at with dampening
      headMesh.rotation.y += (mouseX * 0.35 - headMesh.rotation.y) * 0.08;
      headMesh.rotation.x += (-mouseY * 0.25 - headMesh.rotation.x) * 0.08;

      // State-specific procedural behaviors
      if (currentState === 'speaking') {
        // Mouth animation & visor glow
        const mouthScaleY = 1 + Math.abs(Math.sin(time * 12)) * 3.5;
        const mouthScaleX = 1 + Math.sin(time * 8) * 0.3;
        mouthMesh.scale.set(mouthScaleX, mouthScaleY, 1);
        visorMat.emissiveIntensity = 1.4 + Math.sin(time * 10) * 0.5;
        visorMat.color.setHex(0x06B6D4);
        audioRing.rotation.z = time * 1.2;
        audioRing.scale.setScalar(1 + Math.sin(time * 6) * 0.08);
      } else if (currentState === 'listening') {
        // Attentive tilt & reactive audio ring from candidate
        mouthMesh.scale.set(1, 1, 1);
        headMesh.rotation.z = 0.04;
        const reactiveScale = 1 + audioLevelRef.current * 0.25;
        audioRing.scale.setScalar(reactiveScale);
        visorMat.emissiveIntensity = 1.1 + audioLevelRef.current * 0.8;
        visorMat.color.setHex(0x10B981); // Emerald attentive glow
      } else if (currentState === 'thinking') {
        // Neural orbiters spinning fast
        mouthMesh.scale.set(1, 0.8, 1);
        orbitParticles.rotation.y = time * 2.5;
        orbitMat.color.setHex(0xA855F7); // Purple reasoning glow
        visorMat.emissiveIntensity = 1.0 + Math.sin(time * 4) * 0.6;
        visorMat.color.setHex(0x818CF8);
      } else {
        // Idle
        mouthMesh.scale.set(1, 1, 1);
        headMesh.rotation.z = 0;
        visorMat.emissiveIntensity = 0.8;
        visorMat.color.setHex(0x38BDF8);
        orbitParticles.rotation.y = time * 0.3;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // State Badge Label and Colors
  const getStateBadge = () => {
    switch (state) {
      case 'speaking':
        return {
          label: 'AI INTERVIEWER • SPEAKING',
          badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
        };
      case 'listening':
        return {
          label: 'AI INTERVIEWER • LISTENING CAREFULLY',
          badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
        };
      case 'thinking':
        return {
          label: 'AI INTERVIEWER • EVALUATING & REASONING',
          badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
        };
      default:
        return {
          label: 'AI INTERVIEWER • READY',
          badgeClass: 'bg-slate-700/30 text-slate-300 border-slate-600/30'
        };
    }
  };

  const badge = getStateBadge();

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <div 
        ref={containerRef} 
        className="w-full h-[280px] sm:h-[340px] md:h-[400px] relative pointer-events-auto"
      />
      
      {/* Dynamic State Overlay Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider border backdrop-blur-md transition-all duration-300 ${badge.badgeClass}`}>
          {badge.label}
        </span>
        <span className="text-[11px] text-slate-400 font-medium">
          {avatarName} • {avatarTitle}
        </span>
      </div>
    </div>
  );
};
