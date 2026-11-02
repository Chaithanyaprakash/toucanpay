"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hero3DCanvasProps {
  concept?: "A" | "B" | "C";
}

export default function Hero3DCanvas({ concept = "A" }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL support & reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setWebglSupported(false);
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch (e) {
      setWebglSupported(false);
      return;
    }

    // Three.js Scene Setup
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    // Subtle fog to blend smoothly with light background
    scene.fog = new THREE.FogExp2(0xf8fafd, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Group for entire rotating mesh
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central Core: Geometric Crystal (Fintech Core Engine)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x2855c5,
      metalness: 0.15,
      roughness: 0.1,
      transmission: 0.85, // Glass / crystal look
      thickness: 1.2,
      ior: 1.5,
      transparent: true,
      opacity: 0.9,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // Wireframe overlay for high-tech look
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireMesh = new THREE.Mesh(coreGeo, wireMat);
    wireMesh.scale.set(1.02, 1.02, 1.02);
    rootGroup.add(wireMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.4,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    // 2. Orbital Rings (Payment Rails: UPI, Card, Switch, Trade)
    const ringGroup = new THREE.Group();
    rootGroup.add(ringGroup);

    const createRing = (radius: number, tube: number, color: number, rotX: number, rotY: number) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 80);
      const ringMat = new THREE.MeshStandardMaterial({
        color: color,
        metalness: 0.6,
        roughness: 0.2,
        transparent: true,
        opacity: 0.7,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = rotX;
      ringMesh.rotation.y = rotY;
      ringGroup.add(ringMesh);
      return ringMesh;
    };

    const ring1 = createRing(2.6, 0.02, 0x0284c7, Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(3.1, 0.02, 0x2855c5, -Math.PI / 4, Math.PI / 4);
    const ring3 = createRing(3.5, 0.015, 0x10b981, Math.PI / 2.2, 0);

    // 3. Orbiting Nodes (Bank & Processor Gateways)
    const nodeCount = 6;
    const nodeMeshes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const nodeColors = [0x0284c7, 0x2855c5, 0x10b981, 0x0ea5e9, 0x000045, 0x0284c7];

    for (let i = 0; i < nodeCount; i++) {
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        roughness: 0.1,
        metalness: 0.8,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      rootGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);
    }

    // 4. Particle Field (Transaction Stream)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.0 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleScales[i] = Math.random() * 0.06 + 0.02;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x0284c7,
      size: 0.06,
      transparent: true,
      opacity: 0.65,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particlePoints);

    // 5. Lighting Setup (Bright Light Fintech Aesthetics)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(5, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x0284c7, 1.5);
    dirLight2.position.set(-5, -4, -4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x2855c5, 2.5, 10);
    pointLight.position.set(0, 0, 1.5);
    scene.add(pointLight);

    // Pointer Interaction Handling
    let targetRotX = 0;
    let targetRotY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.35;
    };

    window.addEventListener("mousemove", onPointerMove);

    // Responsive Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera / mesh rotation lerp
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.04;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.04;

      // Autonomous gentle spin
      coreMesh.rotation.y = elapsedTime * 0.25;
      coreMesh.rotation.x = elapsedTime * 0.15;
      wireMesh.rotation.y = -elapsedTime * 0.18;

      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.25;
      ring3.rotation.z = elapsedTime * 0.2;

      // Update node positions along orbits
      for (let i = 0; i < nodeCount; i++) {
        const angle = elapsedTime * 0.4 + (i * Math.PI * 2) / nodeCount;
        const radius = 2.7 + (i % 2) * 0.5;
        nodeMeshes[i].position.x = Math.cos(angle) * radius;
        nodeMeshes[i].position.y = Math.sin(angle * 1.2) * 0.8;
        nodeMeshes[i].position.z = Math.sin(angle) * radius;
      }

      // Rotate particle cloud
      particlePoints.rotation.y = elapsedTime * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      wireMat.dispose();
    };
  }, [concept]);

  if (!isClient) return null;

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] lg:h-[520px] flex items-center justify-center">
      {webglSupported ? (
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      ) : (
        /* Accessible 2D Fallback for Low-Power Devices or Reduced Motion */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-surface-subtle border border-line rounded-3xl">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-cyan/40 animate-spin" style={{ animationDuration: "20s" }} />
            <div className="absolute inset-4 rounded-full border border-brand-blue/30 animate-spin" style={{ animationDuration: "14s", animationDirection: "reverse" }} />
            <div className="w-24 h-24 rounded-2xl bg-white shadow-card border border-line flex items-center justify-center">
              <img src="/brand/orchestration.svg" alt="Toucan SuperStream Orchestration" className="w-12 h-12" />
            </div>
          </div>
          <p className="mt-4 text-xs font-mono text-ink-secondary uppercase tracking-wider">
            SuperStream Dynamic Network Active • 99.98% Rail Availability
          </p>
        </div>
      )}

      {/* Floating telemetry pills */}
      <div className="absolute top-4 right-4 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-line shadow-subtle text-xs font-medium text-ink-primary">
        <span className="w-2 h-2 rounded-full bg-brand-success animate-ping" />
        <span>UPI • Visa • BBPS Active</span>
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-line shadow-subtle text-xs font-medium text-ink-primary">
        <span className="text-brand-blue font-semibold">Latency:</span>
        <span className="font-mono text-ink-secondary">42ms routing overhead</span>
      </div>
    </div>
  );
}
