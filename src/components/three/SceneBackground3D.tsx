```tsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const SceneBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.5)
    );

    container.appendChild(renderer.domElement);

    // ----------------------------------
    // CHROME / WHITE AMBIENT PARTICLES
    // ----------------------------------

    const particleCount = 180;

    const particleGeometry =
      new THREE.BufferGeometry();

    const particlePositions =
      new Float32Array(
        particleCount * 3
      );

    const particleSizes =
      new Float32Array(
        particleCount
      );

    const particleSeeds: number[] = [];

    for (
      let i = 0;
      i < particleCount;
      i++
    ) {
      const i3 = i * 3;

      particlePositions[i3] =
        (Math.random() - 0.5) * 1200;

      particlePositions[i3 + 1] =
        (Math.random() - 0.5) * 1000;

      particlePositions[i3 + 2] =
        (Math.random() - 0.5) * 700;

      particleSizes[i] =
        Math.random() * 2.4 + 0.8;

      particleSeeds.push(
        Math.random() * Math.PI * 2
      );
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        particlePositions,
        3
      )
    );

    particleGeometry.setAttribute(
      "size",
      new THREE.BufferAttribute(
        particleSizes,
        1
      )
    );

    const particleMaterial =
      new THREE.PointsMaterial({
        color: 0xd6d6d6,
        size: 2.1,
        transparent: true,
        opacity: 0.3,
        blending: THREE.NormalBlending,
        sizeAttenuation: true,
      });

    const particles =
      new THREE.Points(
        particleGeometry,
        particleMaterial
      );

    scene.add(particles);

    // ----------------------------------
    // LIME PROGRESS NODES
    // ----------------------------------

    const limeGeometry =
      new THREE.BufferGeometry();

    const limePositions =
      new Float32Array(18 * 3);

    for (let i = 0; i < 18; i++) {
      const i3 = i * 3;

      limePositions[i3] =
        (Math.random() - 0.5) * 1000;

      limePositions[i3 + 1] =
        (Math.random() - 0.5) * 850;

      limePositions[i3 + 2] =
        (Math.random() - 0.5) * 500;
    }

    limeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        limePositions,
        3
      )
    );

    const limeMaterial =
      new THREE.PointsMaterial({
        color: 0xd6ff3f,
        size: 3.2,
        transparent: true,
        opacity: 0.48,
        sizeAttenuation: true,
      });

    const limeNodes =
      new THREE.Points(
        limeGeometry,
        limeMaterial
      );

    scene.add(limeNodes);

    // ----------------------------------
    // ORANGE CHALLENGE NODES
    // ----------------------------------

    const orangeGeometry =
      new THREE.BufferGeometry();

    const orangePositions =
      new Float32Array(10 * 3);

    for (let i = 0; i < 10; i++) {
      const i3 = i * 3;

      orangePositions[i3] =
        (Math.random() - 0.5) * 900;

      orangePositions[i3 + 1] =
        (Math.random() - 0.5) * 800;

      orangePositions[i3 + 2] =
        (Math.random() - 0.5) * 450;
    }

    orangeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        orangePositions,
        3
      )
    );

    const orangeMaterial =
      new THREE.PointsMaterial({
        color: 0xff6b4a,
        size: 3.6,
        transparent: true,
        opacity: 0.38,
        sizeAttenuation: true,
      });

    const orangeNodes =
      new THREE.Points(
        orangeGeometry,
        orangeMaterial
      );

    scene.add(orangeNodes);

    // ----------------------------------
    // FLOATING CHROME ORBS
    // ----------------------------------

    const orbGroup =
      new THREE.Group();

    scene.add(orbGroup);

    const orbData: Array<{
      mesh: THREE.Mesh;
      speed: number;
      offset: number;
      baseX: number;
      baseY: number;
    }> = [];

    const orbGeometry =
      new THREE.SphereGeometry(
        10,
        32,
        32
      );

    const createOrb = (
      x: number,
      y: number,
      z: number,
      scale: number,
      speed: number
    ) => {
      const material =
        new THREE.MeshStandardMaterial({
          color: 0x9d9d9d,
          metalness: 1,
          roughness: 0.18,
        });

      const orb = new THREE.Mesh(
        orbGeometry,
        material
      );

      orb.position.set(x, y, z);

      orb.scale.setScalar(scale);

      orbGroup.add(orb);

      orbData.push({
        mesh: orb,
        speed,
        offset:
          Math.random() *
          Math.PI *
          2,
        baseX: x,
        baseY: y,
      });
    };

    createOrb(
      -240,
      170,
      -100,
      1.2,
      0.35
    );

    createOrb(
      260,
      -140,
      -80,
      0.8,
      0.48
    );

    createOrb(
      150,
      230,
      -180,
      0.55,
      0.28
    );

    createOrb(
      -310,
      -210,
      -120,
      0.7,
      0.4
    );

    // ----------------------------------
    // LIGHTING FOR CHROME
    // ----------------------------------

    const ambientLight =
      new THREE.AmbientLight(
        0xffffff,
        1.1
      );

    scene.add(ambientLight);

    const keyLight =
      new THREE.PointLight(
        0xffffff,
        4,
        700
      );

    keyLight.position.set(
      -150,
      200,
      200
    );

    scene.add(keyLight);

    const softLight =
      new THREE.PointLight(
        0xffffff,
        2.5,
        700
      );

    softLight.position.set(
      200,
      -100,
      150
    );

    scene.add(softLight);

    const limeLight =
      new THREE.PointLight(
        0xd6ff3f,
        0.8,
        500
      );

    limeLight.position.set(
      -220,
      -100,
      100
    );

    scene.add(limeLight);

    const orangeLight =
      new THREE.PointLight(
        0xff6b4a,
        0.65,
        500
      );

    orangeLight.position.set(
      240,
      150,
      80
    );

    scene.add(orangeLight);

    // ----------------------------------
    // MOUSE REACTION
    // ----------------------------------

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      mouseX =
        event.clientX /
          window.innerWidth -
        0.5;

      mouseY =
        event.clientY /
          window.innerHeight -
        0.5;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    // ----------------------------------
    // RESIZE
    // ----------------------------------

    const handleResize = () => {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    // ----------------------------------
    // ANIMATION
    // ----------------------------------

    let animationId: number;

    const startTime =
      performance.now();

    const animate = () => {
      animationId =
        requestAnimationFrame(animate);

      const time =
        (performance.now() -
          startTime) *
        0.001;

      // Ambient chrome particles
      particles.rotation.y =
        time * 0.012;

      particles.rotation.x =
        Math.sin(time * 0.08) *
        0.03;

      // Progress nodes
      limeNodes.rotation.y =
        time * 0.028;

      limeNodes.rotation.x =
        Math.sin(time * 0.15) *
        0.08;

      // Challenge nodes move differently
      orangeNodes.rotation.y =
        -time * 0.04;

      orangeNodes.rotation.z =
        Math.sin(time * 0.3) *
        0.1;

      // Whole ecosystem reacts subtly
      scene.rotation.y +=
        (mouseX * 0.08 -
          scene.rotation.y) *
        0.015;

      scene.rotation.x +=
        (-mouseY * 0.04 -
          scene.rotation.x) *
        0.015;

      // Each chrome orb has
      // its own independent movement
      orbData.forEach(
        ({
          mesh,
          speed,
          offset,
          baseX,
          baseY,
        }) => {
          mesh.position.y =
            baseY +
            Math.sin(
              time * speed +
                offset
            ) *
              18;

          mesh.position.x =
            baseX +
            Math.cos(
              time *
                speed *
                0.7 +
                offset
            ) *
              8;

          mesh.rotation.y +=
            0.002 * speed;

          mesh.rotation.x +=
            0.001 * speed;
        }
      );

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      cancelAnimationFrame(
        animationId
      );

      particleGeometry.dispose();
      particleMaterial.dispose();

      limeGeometry.dispose();
      limeMaterial.dispose();

      orangeGeometry.dispose();
      orangeMaterial.dispose();

      orbGeometry.dispose();

      orbData.forEach(
        ({ mesh }) => {
          const material =
            mesh.material as THREE.Material;

          material.dispose();
        }
      );

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

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-70 dark:opacity-40"
      aria-hidden="true"
    />
  );
};
```
