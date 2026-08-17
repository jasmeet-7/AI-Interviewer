import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const SceneBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ alpha: true, powerPreference: 'low-power' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Particle Stars
    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1200;
      positions[i + 1] = (Math.random() - 0.5) * 1200;
      positions[i + 2] = (Math.random() - 0.5) * 800;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x38BDF8,
      size: 2.2,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      particles.rotation.y += 0.0003;
      particles.rotation.x += 0.00015;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
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
