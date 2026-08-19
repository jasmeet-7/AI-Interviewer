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
    const container = containerRef.current;

    if (!container) return;

    const scene = new THREE.Scene();

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

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

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);

    // HEAD

    const headGeometry = new THREE.SphereGeometry(
      0.78,
      64,
      64
    );

    headGeometry.scale(1, 1.12, 1);

    const headMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xb8b8b8,
        metalness: 1,
        roughness: 0.16,
      });

    const head = new THREE.Mesh(
      headGeometry,
      headMaterial
    );

    avatarGroup.add(head);

    // DARK FACE

    const faceGeometry = new THREE.SphereGeometry(
      0.63,
      64,
      64
    );

    faceGeometry.scale(1, 1.04, 0.35);

    const faceMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x090b0a,
        metalness: 0.7,
        roughness: 0.28,
      });

    const face = new THREE.Mesh(
      faceGeometry,
      faceMaterial
    );

    face.position.z = 0.55;
    head.add(face);

    // EYES

    const eyesGroup = new THREE.Group();
    eyesGroup.position.z = 0.78;

    head.add(eyesGroup);

    const createEye = (x: number) => {
      const group = new THREE.Group();

      const eyeGeometry =
        new THREE.SphereGeometry(
          0.19,
          32,
          32
        );

      eyeGeometry.scale(1, 1, 0.55);

      const eyeMaterial =
        new THREE.MeshStandardMaterial({
          color: 0xe5e5e5,
          metalness: 1,
          roughness: 0.12,
        });

      const eye = new THREE.Mesh(
        eyeGeometry,
        eyeMaterial
      );

      group.add(eye);

      const pupilGeometry =
        new THREE.SphereGeometry(
          0.085,
          32,
          32
        );

      pupilGeometry.scale(1, 1, 0.45);

      const pupilMaterial =
        new THREE.MeshStandardMaterial({
          color: 0x050505,
          metalness: 0.5,
          roughness: 0.2,
        });

      const pupil = new THREE.Mesh(
        pupilGeometry,
        pupilMaterial
      );

      pupil.position.z = 0.12;

      group.add(pupil);

      const highlightGeometry =
        new THREE.SphereGeometry(
          0.022,
          16,
          16
        );

      const highlightMaterial =
        new THREE.MeshBasicMaterial({
          color: 0xffffff,
        });

      const highlight = new THREE.Mesh(
        highlightGeometry,
        highlightMaterial
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
        eyeGeometry,
        eyeMaterial,
        pupilGeometry,
        pupilMaterial,
        highlightGeometry,
        highlightMaterial,
      };
    };

    const leftEye = createEye(-0.27);
    const rightEye = createEye(0.27);

    eyesGroup.add(leftEye.group);
    eyesGroup.add(rightEye.group);

    // MOUTH

    const mouthGeometry =
      new THREE.BoxGeometry(
        0.28,
        0.025,
        0.025
      );

    const mouthMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x151515,
        metalness: 0.7,
        roughness: 0.2,
      });

    const mouth = new THREE.Mesh(
      mouthGeometry,
      mouthMaterial
    );

    mouth.position.set(
      0,
      -0.31,
      0.79
    );

    head.add(mouth);

    // COLLAR

    const collarGeometry =
      new THREE.CylinderGeometry(
        0.82,
        1.12,
        0.48,
        64
      );

    const collarMaterial =
      new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.95,
        roughness: 0.25,
      });

    const collar = new THREE.Mesh(
      collarGeometry,
      collarMaterial
    );

    collar.position.y = -1.05;

    avatarGroup.add(collar);

    // STATE RING

    const ringGeometry =
      new THREE.TorusGeometry(
        1.08,
        0.018,
        16,
        96
      );

    const ringMaterial =
      new THREE.MeshStandardMaterial({
        color: 0xbdbdbd,
        emissive: 0x000000,
        emissiveIntensity: 0,
        metalness: 0.9,
        roughness: 0.18,
        transparent: true,
        opacity: 0.72,
      });

    const stateRing = new THREE.Mesh(
      ringGeometry,
      ringMaterial
    );

    stateRing.rotation.x = Math.PI / 2;

    avatarGroup.add(stateRing);

    // PARTICLES

    const particleCount = 48;

    const particleGeometry =
      new THREE.BufferGeometry();

    const particlePositions =
      new Float32Array(
        particleCount * 3
      );

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      const angle =
        (i / particleCount) *
        Math.PI *
        2;

      const radius =
        1.18 +
        Math.random() * 0.35;

      particlePositions[i3] =
        Math.cos(angle) * radius;

      particlePositions[i3 + 1] =
        (Math.random() - 0.5) * 1.4;

      particlePositions[i3 + 2] =
        Math.sin(angle) *
        radius *
        0.5;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        particlePositions,
        3
      )
    );

    const particleMaterial =
      new THREE.PointsMaterial({
        size: 0.035,
        color: 0xb8b8b8,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      });

    const particles = new THREE.Points(
      particleGeometry,
      particleMaterial
    );

    avatarGroup.add(particles);

    // LIGHTS

    const ambientLight =
      new THREE.AmbientLight(
        0xffffff,
        1.4
      );

    scene.add(ambientLight);

    const keyLight =
      new THREE.DirectionalLight(
        0xffffff,
        3.2
      );

    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    const fillLight =
      new THREE.DirectionalLight(
        0x777777,
        1.8
      );

    fillLight.position.set(-4, 1, 2);
    scene.add(fillLight);

    const limeLight =
      new THREE.PointLight(
        0xd6ff3f,
        0,
        8
      );

    limeLight.position.set(-2, 0.5, 2);
    scene.add(limeLight);

    const orangeLight =
      new THREE.PointLight(
        0xff6b4a,
        0,
        8
      );

    orangeLight.position.set(2, 0.5, 2);
    scene.add(orangeLight);

    // CURSOR

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

    // RESIZE

    const handleResize = () => {
      const newWidth =
        container.clientWidth || 320;

      const newHeight =
        container.clientHeight || 320;

      camera.aspect =
        newWidth / newHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        newWidth,
        newHeight
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    let animationFrame = 0;
    const startTime = performance.now();

    const animate = () => {
      animationFrame =
        requestAnimationFrame(animate);

      const time =
        (performance.now() - startTime) *
        0.001;

      const currentState =
        stateRef.current;

      avatarGroup.position.y =
        Math.sin(time * 1.3) * 0.055;

      head.rotation.y +=
        (mouseX * 0.3 -
          head.rotation.y) *
        0.06;

      head.rotation.x +=
        (-mouseY * 0.2 -
          head.rotation.x) *
        0.06;

      const targetEyeX =
        mouseX * 0.035;

      const targetEyeY =
        mouseY * 0.025;

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

      head.rotation.z *= 0.92;

      particleMaterial.color.setHex(
        0xb8b8b8
      );

      ringMaterial.color.setHex(
        0xbdbdbd
      );

      ringMaterial.emissive.setHex(
        0x000000
      );

      ringMaterial.emissiveIntensity = 0;

      limeLight.intensity = 0;
      orangeLight.intensity = 0;

      mouth.scale.x = 1;
      mouth.scale.y = 1;

      if (currentState === "speaking") {
        mouth.scale.y =
          1 +
          Math.abs(
            Math.sin(time * 11)
          ) *
            4;

        mouth.scale.x =
          1 +
          Math.sin(time * 8) * 0.15;

        ringMaterial.color.setHex(
          0xff6b4a
        );

        ringMaterial.emissive.setHex(
          0xff6b4a
        );

        ringMaterial.emissiveIntensity =
          0.7;

        orangeLight.intensity =
          3.2 +
          Math.sin(time * 8) * 0.8;

        particleMaterial.color.setHex(
          0xff6b4a
        );

        particles.rotation.y =
          time * 0.8;

        stateRing.rotation.z =
          time * 1.2;
      } else if (
        currentState === "listening"
      ) {
        head.rotation.z = 0.05;

        const audioReaction =
          audioLevelRef.current;

        stateRing.scale.setScalar(
          1 + audioReaction * 0.28
        );

        ringMaterial.color.setHex(
          0xd6ff3f
        );

        ringMaterial.emissive.setHex(
          0xd6ff3f
        );

        ringMaterial.emissiveIntensity =
          0.55 +
          audioReaction * 0.8;

        limeLight.intensity =
          2.4 +
          audioReaction * 2;

        particleMaterial.color.setHex(
          0xd6ff3f
        );

        particles.rotation.y =
          time * 0.35;
      } else if (
        currentState === "thinking"
      ) {
        mouth.scale.y = 0.7;

        ringMaterial.color.setHex(
          0xffffff
        );

        ringMaterial.emissive.setHex(
          0x666666
        );

        ringMaterial.emissiveIntensity =
          0.45 +
          Math.sin(time * 4) * 0.25;

        particleMaterial.color.setHex(
          0xffffff
        );

        particles.rotation.y =
          time * 2.1;

        particles.rotation.x =
          Math.sin(time * 1.5) * 0.25;

        stateRing.rotation.z =
          -time * 0.7;
      } else {
        particles.rotation.y =
          time * 0.18;

        stateRing.rotation.z =
          time * 0.08;
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

      headGeometry.dispose();
      headMaterial.dispose();

      faceGeometry.dispose();
      faceMaterial.dispose();

      leftEye.eyeGeometry.dispose();
      leftEye.eyeMaterial.dispose();
      leftEye.pupilGeometry.dispose();
      leftEye.pupilMaterial.dispose();
      leftEye.highlightGeometry.dispose();
      leftEye.highlightMaterial.dispose();

      rightEye.eyeGeometry.dispose();
      rightEye.eyeMaterial.dispose();
      rightEye.pupilGeometry.dispose();
      rightEye.pupilMaterial.dispose();
      rightEye.highlightGeometry.dispose();
      rightEye.highlightMaterial.dispose();

      mouthGeometry.dispose();
      mouthMaterial.dispose();

      collarGeometry.dispose();
      collarMaterial.dispose();

      ringGeometry.dispose();
      ringMaterial.dispose();

      particleGeometry.dispose();
      particleMaterial.dispose();

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
    if (state === "speaking") {
      return {
        label: "AI INTERVIEWER • SPEAKING",
        badgeClass:
          "bg-[#FF6B4A]/15 text-[#FF8A72] border-[#FF6B4A]/30",
      };
    }

    if (state === "listening") {
      return {
        label: "AI INTERVIEWER • LISTENING",
        badgeClass:
          "bg-[#D6FF3F]/15 text-[#D6FF3F] border-[#D6FF3F]/30",
      };
    }

    if (state === "thinking") {
      return {
        label: "AI INTERVIEWER • THINKING",
        badgeClass:
          "bg-white/10 text-white border-white/20",
      };
    }

    return {
      label: "AI INTERVIEWER • READY",
      badgeClass:
        "bg-white/5 text-slate-300 border-white/10",
    };
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
          className={`rounded-full border px-3 py-1 text-xs font-semibold tracking-wider backdrop-blur-md ${badge.badgeClass}`}
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
