import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Holographic Ring
    const torusGeometry = new THREE.TorusGeometry(1.8, 0.04, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({
      color: 0x06B6D4,
      emissive: 0x0284C7,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.rotation.x = Math.PI / 3;
    mainGroup.add(torusMesh);

    // 2. Second Concentric Orbit Ring
    const outerTorusGeo = new THREE.TorusGeometry(2.4, 0.02, 16, 100);
    const outerTorusMat = new THREE.MeshStandardMaterial({
      color: 0x3B82F6,
      emissive: 0x2563EB,
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.7
    });
    const outerTorus = new THREE.Mesh(outerTorusGeo, outerTorusMat);
    outerTorus.rotation.x = -Math.PI / 4;
    outerTorus.rotation.y = Math.PI / 6;
    mainGroup.add(outerTorus);

    // 3. Central Core Icosahedron (Neural AI Node)
    const icoGeometry = new THREE.IcosahedronGeometry(0.85, 1);
    const icoMaterial = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
      emissive: 0x38BDF8,
      emissiveIntensity: 0.3
    });
    const icoCore = new THREE.Mesh(icoGeometry, icoMaterial);
    mainGroup.add(icoCore);

    // Solid inner core
    const innerSphereGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const innerSphereMat = new THREE.MeshStandardMaterial({
      color: 0x0284C7,
      emissive: 0x06B6D4,
      emissiveIntensity: 0.9,
      roughness: 0.1
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    mainGroup.add(innerSphere);

    // 4. Floating Neural Particles
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 6;

      // Cyan to blue to violet shades
      const c = Math.random() > 0.5 ? new THREE.Color(0x38BDF8) : new THREE.Color(0x818CF8);
      colors[i] = c.r;
      colors[i + 1] = c.g;
      colors[i + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.75
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06B6D4, 3, 20);
    pointLight1.position.set(3, 4, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x6366F1, 2, 20);
    pointLight2.position.set(-3, -3, 2);
    scene.add(pointLight2);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / width) * 2 - 1;
      mouseY = -(((event.clientY - rect.top) / height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
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
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      mainGroup.rotation.y = targetX * 0.6 + elapsedTime * 0.15;
      mainGroup.rotation.x = -targetY * 0.4 + Math.sin(elapsedTime * 0.5) * 0.1;

      torusMesh.rotation.z = elapsedTime * 0.3;
      outerTorus.rotation.z = -elapsedTime * 0.25;
      icoCore.rotation.x = elapsedTime * 0.2;
      icoCore.rotation.y = elapsedTime * 0.3;

      // Pulse inner core
      const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
      innerSphere.scale.set(scale, scale, scale);

      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[380px] lg:min-h-[520px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D AI Interview Workspace"
    />
  );
};
