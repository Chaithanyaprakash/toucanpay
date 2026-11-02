"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Interactive3DGlobe({ size = 360 }: { size?: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Camera positioned with generous distance (3.6) to guarantee ZERO clipping of sphere, orbital ring & high arcs
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 3.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 2. Base Globe Group for coordinated rotation
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Globe Radius calibrated to fit with ample breathing room
    const globeRadius = 0.90;

    // Inner Solid Luminous Core (Gives the globe solid presence & contrast on light backgrounds)
    const coreGeometry = new THREE.SphereGeometry(globeRadius * 0.98, 36, 36);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xE8F2FC,
      transparent: true,
      opacity: 0.92,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    globeGroup.add(coreMesh);

    // Latitude & Longitude Wireframe Grid (Crisp Royal Blue)
    const wireGeometry = new THREE.SphereGeometry(globeRadius, 28, 28);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x0F52BA,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    globeGroup.add(wireMesh);

    // 3. Dot Matrix Points on Globe Surface (Deep Royal & Vibrant Blue)
    const dotsCount = 520;
    const dotPositions = new Float32Array(dotsCount * 3);
    for (let i = 0; i < dotsCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / dotsCount);
      const theta = Math.sqrt(dotsCount * Math.PI) * phi;
      const x = globeRadius * Math.cos(theta) * Math.sin(phi);
      const y = globeRadius * Math.sin(theta) * Math.sin(phi);
      const z = globeRadius * Math.cos(phi);
      dotPositions[i * 3] = x;
      dotPositions[i * 3 + 1] = y;
      dotPositions[i * 3 + 2] = z;
    }
    const dotsGeometry = new THREE.BufferGeometry();
    dotsGeometry.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    const dotsMaterial = new THREE.PointsMaterial({
      color: 0x0F52BA,
      size: 0.032,
      transparent: true,
      opacity: 0.85,
    });
    const dotsMesh = new THREE.Points(dotsGeometry, dotsMaterial);
    globeGroup.add(dotsMesh);

    // 4. Global Financial Hub Coordinates (Lat, Lon to 3D Vector3)
    const latLongToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.cos(theta)),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
    };

    // Major Toucan Settlement Nodes
    const financialHubs = [
      { name: "Mumbai", lat: 19.076, lon: 72.877, color: 0x0F52BA },
      { name: "Singapore", lat: 1.352, lon: 103.819, color: 0x0284C7 },
      { name: "London", lat: 51.507, lon: -0.127, color: 0x0F52BA },
      { name: "New York", lat: 40.712, lon: -74.006, color: 0x0284C7 },
      { name: "Dubai", lat: 25.204, lon: 55.27, color: 0x136FC6 },
    ];

    const hubCoords = financialHubs.map((hub) => latLongToVector3(hub.lat, hub.lon, globeRadius));

    // Place Financial Hub Pins & Pulsing Halo Rings
    const halos: THREE.Mesh[] = [];
    hubCoords.forEach((pos, idx) => {
      // Solid Marker Pin
      const pinGeom = new THREE.SphereGeometry(0.042, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: financialHubs[idx].color });
      const pin = new THREE.Mesh(pinGeom, pinMat);
      pin.position.copy(pos);
      globeGroup.add(pin);

      // Pulsing Halo Beacon
      const haloGeom = new THREE.RingGeometry(0.045, 0.075, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x00D2FF,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
      });
      const halo = new THREE.Mesh(haloGeom, haloMat);
      halo.position.copy(pos.clone().multiplyScalar(1.002));
      halo.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(halo);
      halos.push(halo);
    });

    // 5. 3D Cross-Border Bezier Transaction Arcs
    const curves: THREE.QuadraticBezierCurve3[] = [];
    const createTransactionArc = (start: THREE.Vector3, end: THREE.Vector3) => {
      const mid = start.clone().lerp(end, 0.5);
      // Altitude constrained so arc stays well inside visible bounds
      mid.normalize().multiplyScalar(globeRadius * 1.26);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      curves.push(curve);

      const points = curve.getPoints(50);
      const arcGeom = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x0284C7,
        transparent: true,
        opacity: 0.75,
      });
      return new THREE.Line(arcGeom, arcMat);
    };

    // Connect Corridors: Mumbai <-> London, Mumbai <-> Singapore, Mumbai <-> Dubai, London <-> New York, Dubai <-> London
    globeGroup.add(createTransactionArc(hubCoords[0], hubCoords[1]));
    globeGroup.add(createTransactionArc(hubCoords[0], hubCoords[2]));
    globeGroup.add(createTransactionArc(hubCoords[0], hubCoords[4]));
    globeGroup.add(createTransactionArc(hubCoords[2], hubCoords[3]));
    globeGroup.add(createTransactionArc(hubCoords[4], hubCoords[2]));

    // 6. Animated Transaction Pulse Particles Traveling Along Arcs
    const particleGeometry = new THREE.SphereGeometry(0.024, 12, 12);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x00D2FF });
    const pulseParticles: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; progress: number; speed: number }[] = [];

    curves.forEach((curve, i) => {
      const pMesh = new THREE.Mesh(particleGeometry, particleMaterial);
      globeGroup.add(pMesh);
      pulseParticles.push({
        mesh: pMesh,
        curve,
        progress: (i * 0.2) % 1,
        speed: 0.005 + (i % 3) * 0.002,
      });
    });

    // 7. Fully Visible Orbital Rings (Constrained so never clipped by viewport)
    const ringGroup = new THREE.Group();
    scene.add(ringGroup);

    // Inner orbital track
    const ringGeom = new THREE.RingGeometry(globeRadius * 1.14, globeRadius * 1.17, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0F52BA,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    ringGroup.add(ring);

    // Subtle outer thin orbit line
    const outerRingGeom = new THREE.RingGeometry(globeRadius * 1.22, globeRadius * 1.23, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x0284C7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.20,
    });
    const outerRing = new THREE.Mesh(outerRingGeom, outerRingMat);
    outerRing.rotation.x = Math.PI / 2.3;
    ringGroup.add(outerRing);

    // 8. Interactive Mouse & Touch Drag Controls
    let isDragging = false;
    let previousPosition = { x: 0, y: 0 };
    const domElement = renderer.domElement;

    const handlePointerDown = (clientX: number, clientY: number) => {
      isDragging = true;
      previousPosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!isDragging) return;
      const deltaX = clientX - previousPosition.x;
      const deltaY = clientY - previousPosition.y;

      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x += deltaY * 0.006;
      ringGroup.rotation.z += deltaX * 0.002;

      previousPosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    // Mouse Events
    const onMouseDown = (e: MouseEvent) => handlePointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = () => handlePointerUp();

    // Touch Events for Mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handlePointerUp();

    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // 9. Smooth 60FPS Animation Loop
    let animationFrameId: number;
    let clock = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock += 0.02;

      // Auto-rotation when idle
      if (!isDragging) {
        globeGroup.rotation.y += 0.0028;
        ringGroup.rotation.z += 0.0008;
      }

      // Animate Beacon Halos Scale Pulse
      const scaleVal = 1 + Math.sin(clock * 3) * 0.22;
      halos.forEach((h) => {
        h.scale.set(scaleVal, scaleVal, 1);
      });

      // Animate Traveling Transaction Particles
      pulseParticles.forEach((p) => {
        p.progress = (p.progress + p.speed) % 1;
        const currentPos = p.curve.getPoint(p.progress);
        p.mesh.position.copy(currentPos);
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      renderer.dispose();
      if (mountRef.current && domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(domElement);
      }
    };
  }, [size]);

  return (
    <div className="relative flex items-center justify-center cursor-grab active:cursor-grabbing select-none p-1">
      {/* 3D WebGL Canvas with guaranteed full bounds */}
      <div 
        ref={mountRef} 
        style={{ width: size, height: size }} 
        className="flex items-center justify-center overflow-visible"
      />

      {/* Gentle Ambient Radial Glow (contained within bounds) */}
      <div
        className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
        style={{ width: size * 0.85, height: size * 0.85, margin: "auto" }}
      />
    </div>
  );
}