```tsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import type { AIInterviewerState } from "../../types";

interface AIInterviewer3DAvatarProps {
  state: AIInterviewerState;
  audioLevel?: number;
  avatarName?: string;
  avatarTitle?: string;
}

export const AIInterviewer3DAvatar: React.FC<
  AIInterviewer3DAvatarProps
> = ({
  state,
  audioLevel = 0,
  avatarName = "Dr. Evelyn Vance",
  avatarTitle = "Senior AI Technical Interviewer",
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

    // -----------------------------
    // SCENE
    // -----------------------------

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      width / height,
      0.1,
      100
    );

    camera.position.set(0, 0.1, 4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // -----------------------------
    // ROOT
    // -----------------------------

    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    // -----------------------------
    // CHROME HEAD
    // -----------------------------

    const headGeo = new THREE.SphereGeometry(
      0.78,
      64,
      64
    );

    headGeo.scale(1, 1.12, 1);

    const headMat = new THREE.MeshStandardMaterial({
      color: 0xb8b8b8,
      metalness: 1,
      roughness: 0.16,
      envMapIntensity: 1.4,
    });

    const headMesh = new THREE.Mesh(
      headGeo,
      headMat
    );

    avatarGroup.add(headMesh);

    // -----------------------------
    // INNER DARK FACE SURFACE
    // -----------------------------

    const faceGeo = new THREE.SphereGeometry(
      0.63,
      64,
      64
    );

    faceGeo.scale(1, 1.04, 0.35);

    const faceMat = new THREE.MeshStandardMaterial({
      color: 0x090b0a,
      metalness: 0.7,
      roughness: 0.28,
    });

    const faceMesh = new THREE.Mesh(
      faceGeo,
      faceMat
    );

    faceMesh.position.z = 0.55;

    headMesh.add(faceMesh);

    // -----------------------------
    // EYES
    // -----------------------------

    const eyeGroup = new THREE.Group();
    eyeGroup.position.z = 0.78;

    headMesh.add(eyeGroup);

    const createEye = (x: number) => {
      const group = new THREE.Group();

      const outerGeo = new THREE.SphereGeometry(
        0.19,
        32,
        32
      );

      outerGeo.scale(1, 1, 0.55);

      const outerMat = new THREE.MeshStandardMaterial({
        color: 0xe5e5e5,
        metalness: 1,
        roughness: 0.12,
      });

      const outer = new THREE.Mesh(
        outerGeo,
        outerMat
      );

      group.add(outer);

      const pupilGeo = new THREE.SphereGeometry(
        0.085,
        32,
        32
      );

      pupilGeo.scale(1, 1, 0.45);

      const pupilMat = new THREE.MeshStandardMaterial({
        color: 0x050505,
        metalness: 0.5,
        roughness: 0.2,
      });

      const pupil = new THREE.Mesh(
        pupilGeo,
        pupilMat
      );

      pupil.position.z = 0.12;

      group.add(pupil);

      const highlightGeo = new THREE.SphereGeometry(
        0.022,
        16,
        16
      );

      const highlightMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
      });

      const highlight = new THREE.Mesh(
        highlightGeo,
        highlightMat
      );

      highlight.position.set(
        -0.025,
        0.03,
        0.17
      );

      group.add(highlight);

      group.position.x = x;

      return {
        group,
        pupil,
      };
    };

    const leftEye = createEye(-0.27);
    const rightEye = createEye(0.27);

    eyeGroup.add(leftEye.group);
    eyeGroup.add(rightEye.group);

    // -----------------------------
    // MOUTH
    // -----------------------------

    const mouthGeo = new THREE.BoxGeometry(
      0.28,
      0.025,
      0.025
    );

    const mouthMat = new THREE.MeshStandardMaterial({
      color: 0x151515,
      metalness: 0.7,
      roughness: 0.2,
    });

    const mouthMesh = new THREE.Mesh(
      mouthGeo,
      mouthMat
    );

    mouthMesh.position.set(
      0,
      -0.31,
      0.79
    );

    headMesh.add(mouthMesh);

    // -----------------------------
    // CHROME COLLAR
    // -----------------------------

    const collarGeo = new THREE.CylinderGeometry(
      0.82,
      1.12,
      0.48,
      64
    );

    const collarMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.95,
      roughness: 0.25,
    });

    const collarMesh = new THREE.Mesh(
      collarGeo,
      collarMat
    );

    collarMesh.position.y = -1.05;

    avatarGroup.add(collarMesh);

    // -----------------------------
    // STATE RING
    // Chrome base.
    // Lime = listening/progress.
    // Orange = pressure/speaking.
    // White = thinking.
    // -----------------------------

    const ringGeo = new THREE.TorusGeometry(
      1.08,
      0.018,
      16,
      96
    );

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xbdbdbd,
      emissive: 0x000000,
      emissiveIntensity: 0,
      metalness: 0.9,
      roughness: 0.18,
      transparent: true,
      opacity: 0.72,
    });

    const stateRing = new THREE.Mesh(
      ringGeo,
      ringMat
    );

    stateRing.rotation.x = Math.PI / 2;

    avatarGroup.add(stateRing);

    // -----------------------------
    // INTELLIGENT PARTICLES
    // -----------------------------

    const particleCount = 48;

    const particleGeo = new THREE.BufferGeometry();

    const particlePositions = new Float32Array(
      particleCount * 3
    );

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const angle =
        (i / particleCount) * Math.PI * 2;

      const radius =
        1.18 + Math.random() * 0.35;

      particlePositions[i3] =
        Math.cos(angle) * radius;

      particlePositions[i3 + 1] =
        (Math.random() - 0.5) * 1.4;

      particlePositions[i3 + 2] =
        Math.sin(angle) * radius * 0.5;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(
        particlePositions,
        3
      )
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xb8b8b8,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(
      particleGeo,
      particleMat
    );

    avatarGroup.add(particles);

    // -----------------------------
    // LIGHTING
    // -----------------------------

    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      1.4
    );

    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(
      0xffffff,
      3.2
    );

    keyLight.position.set(3, 4, 5);

    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(
      0x777777,
      1.8
    );

    fillLight.position.set(-4, 1, 2);

    scene.add(fillLight);

    const limeLight = new THREE.PointLight(
      0xd6ff3f,
      0,
      8
    );

    limeLight.position.set(
      -2,
      0.5,
      2
    );

    scene.add(limeLight);

    const orangeLight = new THREE.PointLight(
      0xff6b4a,
      0,
      8
    );

    orangeLight.position.set(
      2,
      0.5,
      2
    );

    scene.add(orangeLight);

    // -----------------------------
    // CURSOR TRACKING
    // -----------------------------

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const rect =
        container.getBoundingClientRect();

      mouseX =
        ((event.clientX - rect.left) /
          rect.width) *
          2 -
        1;

      mouseY =
        -(
          ((event.clientY - rect.top) /
            rect.height) *
            2 -
          1
        );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    // -----------------------------
    // RESIZE
    // -----------------------------

    const handleResize = () => {
      const w =
        container.clientWidth || 320;

      const h =
        container.clientHeight || 320;

      camera.aspect = w / h;

      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    // -----------------------------
    // ANIMATION
    // -----------------------------

    let animationFrame: number;

    const startTime = performance.now();

    const animate = () => {
      animationFrame =
        requestAnimationFrame(animate);

      const time =
        (performance.now() - startTime) *
        0.001;

      const currentState =
        stateRef.current;

      // Living float
      avatarGroup.position.y =
        Math.sin(time * 1.3) * 0.055;

      // Head follows cursor
      headMesh.rotation.y +=
        (mouseX * 0.3 -
          headMesh.rotation.y) *
        0.06;

      headMesh.rotation.x +=
        (-mouseY * 0.2 -
          headMesh.rotation.x) *
        0.06;

      // Eyes track cursor
      const targetEyeX = mouseX * 0.035;
      const targetEyeY = mouseY * 0.025;

      leftEye.pupil.position.x +=
        (targetEyeX -
          leftEye.pupil.position.x) *
        0.12;

      rightEye.pupil.position.x +=
        (targetEyeX -
          rightEye.pupil.position.x) *
        0.12;

      leftEye.pupil.position.y +=
        (targetEyeY -
          leftEye.pupil.position.y) *
        0.12;

      rightEye.pupil.position.y +=
        (targetEyeY -
          rightEye.pupil.position.y) *
        0.12;

      // Reset defaults
      headMesh.rotation.z *= 0.92;

      particleMat.color.setHex(
        0xb8b8b8
      );

      ringMat.color.setHex(
        0xbdbdbd
      );

      ringMat.emissive.setHex(
        0x000000
      );

      ringMat.emissiveIntensity = 0;

      limeLight.intensity = 0;

      orangeLight.intensity = 0;

      mouthMesh.scale.x = 1;
      mouthMesh.scale.y = 1;

      // -----------------------------
      // SPEAKING
      // Orange pressure/energy
      // -----------------------------

      if (currentState === "speaking") {
        const mouthScaleY =
          1 +
          Math.abs(
            Math.sin(time * 11)
          ) *
            4;

        mouthMesh.scale.y =
          mouthScaleY;

        mouthMesh.scale.x =
          1 +
          Math.sin(time * 8) * 0.15;

        ringMat.color.setHex(
          0xff6b4a
        );

        ringMat.emissive.setHex(
          0xff6b4a
        );

        ringMat.emissiveIntensity =
          0.7;

        orangeLight.intensity =
          3.2 +
          Math.sin(time * 8) * 0.8;

        particleMat.color.setHex(
          0xff6b4a
        );

        particles.rotation.y =
          time * 0.8;

        stateRing.rotation.z =
          time * 1.2;

        stateRing.scale.setScalar(
          1 +
            Math.sin(time * 6) *
              0.05
        );
      }

      // -----------------------------
      // LISTENING
      // Lime = attention/progress
      // -----------------------------

      else if (
        currentState === "listening"
      ) {
        headMesh.rotation.z =
          0.05;

        const audioReaction =
          audioLevelRef.current;

        stateRing.scale.setScalar(
          1 + audioReaction * 0.28
        );

        ringMat.color.setHex(
          0xd6ff3f
        );

        ringMat.emissive.setHex(
          0xd6ff3f
        );

        ringMat.emissiveIntensity =
          0.55 + audioReaction * 0.8;

        limeLight.intensity =
          2.4 + audioReaction * 2;

        particleMat.color.setHex(
          0xd6ff3f
        );

        particles.rotation.y =
          time * 0.35;
      }

      // -----------------------------
      // THINKING
      // Chrome intelligence
      // No purple.
      // -----------------------------

      else if (
        currentState === "thinking"
      ) {
        mouthMesh.scale.y = 0.7;

        ringMat.color.setHex(
          0xffffff
        );

        ringMat.emissive.setHex(
          0x666666
        );

        ringMat.emissiveIntensity =
          0.45 +
          Math.sin(time * 4) * 0.25;

        particleMat.color.setHex(
          0xffffff
        );

        particles.rotation.y =
          time * 2.1;

        particles.rotation.x =
          Math.sin(time * 1.5) * 0.25;

        stateRing.rotation.z =
          -time * 0.7;

        stateRing.scale.setScalar(
          1 +
            Math.sin(time * 3) *
              0.035
        );
      }

      // -----------------------------
      // IDLE
      // -----------------------------

      else {
        particles.rotation.y =
          time * 0.18;

        stateRing.rotation.z =
          time * 0.08;

        stateRing.scale.setScalar(
          1 +
            Math.sin(time * 1.5) *
              0.015
        );
      }

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      cancelAnimationFrame(
        animationFrame
      );

      particleGeo.dispose();
      particleMat.dispose();

      headGeo.dispose();
      headMat.dispose();

      faceGeo.dispose();
      faceMat.dispose();

      mouthGeo.dispose();
      mouthMat.dispose();

      collarGeo.dispose();
      collarMat.dispose();

      ringGeo.dispose();
      ringMat.dispose();

      renderer.dispose();

      if (
        container.contains(
          renderer.domElement
        )
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  }, []);

  const getStateBadge = () => {
    switch (state) {
      case "speaking":
        return {
          label:
            "AI INTERVIEWER • SPEAKING",
          badgeClass:
            "bg-[#FF6B4A]/15 text-[#FF8A72] border-[#FF6B4A]/30",
        };

      case "listening":
        return {
          label:
            "AI INTERVIEWER • LISTENING",
          badgeClass:
            "bg-[#D6FF3F]/15 text-[#D6FF3F] border-[#D6FF3F]/30",
        };

      case "thinking":
        return {
          label:
            "AI INTERVIEWER • THINKING",
          badgeClass:
            "bg-white/10 text-white border-white/20",
        };

      default:
        return {
          label:
            "AI INTERVIEWER • READY",
          badgeClass:
            "bg-white/5 text-slate-300 border-white/10",
        };
    }
  };

  const badge = getStateBadge();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <div
        ref={containerRef}
        className="relative h-[280px] w-full pointer-events-auto sm:h-[340px] md:h-[400px]"
      />

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wider backdrop-blur-md transition-all duration-300 ${badge.badgeClass}`}
        >
          {badge.label}
        </span>

        <span className="text-[11px] font-medium text-slate-400">
          {avatarName} • {avatarTitle}
        </span>
      </div>
    </div>
  );
};
```
