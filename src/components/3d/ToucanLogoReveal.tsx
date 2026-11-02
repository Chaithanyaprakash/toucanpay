"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2, 
  Download, 
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { asset } from "@/lib/assets";

interface ToucanLogoRevealProps {
  autoPlay?: boolean;
  loop?: boolean;
  onComplete?: () => void;
  className?: string;
  showControls?: boolean;
  fullscreen?: boolean;
  duration?: number;
}

export default function ToucanLogoReveal({
  autoPlay = true,
  loop = false,
  onComplete,
  className = "",
  showControls = true,
  fullscreen = false,
  duration,
}: ToucanLogoRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animation state
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const isFadingOutRef = useRef<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordProgress, setRecordProgress] = useState<number>(0);
  const [activePhase, setActivePhase] = useState<string>("Phase 1: Card Fly-in");
  
  const totalDuration = duration || (fullscreen ? 5.0 : 8.0);

  // Three.js internal references
  const animStateRef = useRef({
    time: 0,
    isPlaying: autoPlay,
    duration: totalDuration,
    cardMesh: null as THREE.Group | null,
    frontMaterial: null as THREE.MeshStandardMaterial | null,
    edgeMaterial: null as THREE.MeshStandardMaterial | null,
    shadowMesh: null as THREE.Mesh | null,
    particles: null as THREE.Points | null,
    particlePositions: [] as number[],
    particleAlphas: [] as number[],
    starPoints: null as THREE.Points | null,
    starVelocities: [] as { x: number; y: number; z: number; speed: number; phase: number }[],
    starMat: null as THREE.PointsMaterial | null,
    flashLight: null as THREE.PointLight | null,
    camera: null as THREE.PerspectiveCamera | null,
    renderer: null as THREE.WebGLRenderer | null,
    scene: null as THREE.Scene | null,
  });

  // Create High-Resolution Procedural Debit Card Texture
  const createCardTexture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1290;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // 1. Glossy White and Deep Blue Base Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, "#081E3B");     // Deep midnight navy
    bgGrad.addColorStop(0.35, "#0F52BA");  // Royal Blue
    bgGrad.addColorStop(0.75, "#136FC6");  // Toucan Brand Blue
    bgGrad.addColorStop(1, "#EBF4FC");     // Glossy white-blue corner finish
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Subtle Micro-Pattern Concentric Waves
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 3;
    for (let r = 200; r < 2400; r += 70) {
      ctx.beginPath();
      ctx.arc(canvas.width * 0.9, canvas.height * 0.1, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Diagonal Gloss Specular Sheen Layer
    const glossGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    glossGrad.addColorStop(0, "rgba(255, 255, 255, 0.22)");
    glossGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.04)");
    glossGrad.addColorStop(0.6, "rgba(255, 255, 255, 0.18)");
    glossGrad.addColorStop(1, "transparent");
    ctx.fillStyle = glossGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 4. Realistic Gold EMV Chip
    const chipX = 240;
    const chipY = 480;
    const chipW = 260;
    const chipH = 200;
    
    // Chip Outer Shadow
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 6;
    
    // Chip Metallic Gradient
    const chipGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
    chipGrad.addColorStop(0, "#F7D070");
    chipGrad.addColorStop(0.25, "#E2A93B");
    chipGrad.addColorStop(0.5, "#FCE9A0");
    chipGrad.addColorStop(0.75, "#D69726");
    chipGrad.addColorStop(1, "#B87B14");
    ctx.fillStyle = chipGrad;
    
    // Chip rounded rectangle
    ctx.beginPath();
    ctx.roundRect(chipX, chipY, chipW, chipH, 20);
    ctx.fill();
    ctx.restore();

    // Chip internal circuit lines
    ctx.strokeStyle = "rgba(100, 65, 10, 0.55)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(chipX + 20, chipY + chipH / 2);
    ctx.lineTo(chipX + chipW - 20, chipY + chipH / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(chipX + 80, chipY + 20);
    ctx.lineTo(chipX + 80, chipY + chipH - 20);
    ctx.moveTo(chipX + chipW - 80, chipY + 20);
    ctx.lineTo(chipX + chipW - 80, chipY + chipH - 20);
    ctx.stroke();

    // 5. Contactless Payment Wave Symbol
    ctx.save();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    ctx.lineWidth = 7;
    ctx.lineCap = "round";
    const waveX = chipX + chipW + 120;
    const waveY = chipY + chipH / 2;
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(waveX - 30, waveY, i * 22, -Math.PI / 4, Math.PI / 4);
      ctx.stroke();
    }
    ctx.restore();

    // 6. Toucan Pay Minimal Top-Right Watermark
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "bold 64px 'Space Grotesk', -apple-system, sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText("TOUCAN", canvas.width - 480, 190);
    ctx.fillStyle = "#E9953E";
    ctx.fillText("PAY", canvas.width - 200, 190);
    ctx.restore();

    // 7. Minimal Embossed Card Details
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "bold 58px 'JetBrains Mono', monospace";
    ctx.letterSpacing = "8px";
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 3;
    ctx.fillText("••••  ••••  ••••  9012", 240, 910);

    ctx.font = "600 36px 'Space Grotesk', sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.fillText("VALID THRU  10/29", 240, 1020);
    ctx.fillText("ENTERPRISE PLATINUM", 240, 1110);

    // Regulatory PA-CB security badge text
    ctx.font = "bold 32px sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.fillText("RBI PA-CB DIRECT", canvas.width - 520, 1110);
    ctx.restore();

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  };

  // Easing Functions
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const easeInQuad = (t: number) => t * t;

  useEffect(() => {
    if (!canvasRef.current) return;

    if (fullscreen) {
      document.body.style.overflow = "hidden";
    }

    const initialW = fullscreen && typeof window !== "undefined" ? window.innerWidth : 1920;
    const initialH = fullscreen && typeof window !== "undefined" ? window.innerHeight : 1080;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    animStateRef.current.scene = scene;

    const camera = new THREE.PerspectiveCamera(42, initialW / initialH, 0.1, 100);
    camera.position.set(0, 0, 7.2);
    animStateRef.current.camera = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    renderer.setSize(initialW, initialH, false);
    renderer.setPixelRatio(Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    animStateRef.current.renderer = renderer;

    // Window Resize Handler for Fullscreen Viewport
    const handleResize = () => {
      if (!fullscreen || !canvasRef.current || !animStateRef.current.renderer || !animStateRef.current.camera) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      animStateRef.current.camera.aspect = w / h;
      animStateRef.current.camera.updateProjectionMatrix();
      animStateRef.current.renderer.setSize(w, h, false);
    };

    if (fullscreen) {
      window.addEventListener("resize", handleResize);
    }

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.6);
    keyLight.position.set(6, 8, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00D2FF, 1.2);
    rimLight.position.set(-8, -4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xFAF7F2, 0.6);
    fillLight.position.set(0, -6, 4);
    scene.add(fillLight);

    const flashLight = new THREE.PointLight(0xE0F2FE, 0, 15);
    flashLight.position.set(0, 0, 3);
    scene.add(flashLight);
    animStateRef.current.flashLight = flashLight;

    // 3. Build 3D Beveled Debit Card
    const cardGroup = new THREE.Group();
    scene.add(cardGroup);
    animStateRef.current.cardMesh = cardGroup;

    const cardW = 3.37;
    const cardH = 2.12;
    const cardRadius = 0.16;
    const cardThickness = 0.055;

    const shape = new THREE.Shape();
    const x = -cardW / 2;
    const y = -cardH / 2;
    shape.moveTo(x + cardRadius, y);
    shape.lineTo(x + cardW - cardRadius, y);
    shape.quadraticCurveTo(x + cardW, y, x + cardW, y + cardRadius);
    shape.lineTo(x + cardW, y + cardH - cardRadius);
    shape.quadraticCurveTo(x + cardW, y + cardH, x + cardW - cardRadius, y + cardH);
    shape.lineTo(x + cardRadius, y + cardH);
    shape.quadraticCurveTo(x, y + cardH, x, y + cardH - cardRadius);
    shape.lineTo(x, y + cardRadius);
    shape.quadraticCurveTo(x, y, x + cardRadius, y);

    const extrudeSettings = {
      depth: cardThickness,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02,
    };

    const cardGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    cardGeom.center();

    const cardTexture = createCardTexture();
    const frontMaterial = new THREE.MeshStandardMaterial({
      map: cardTexture,
      roughness: 0.16,
      metalness: 0.35,
      transparent: true,
      opacity: 1,
    });

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xE2E8F0,
      metalness: 0.92,
      roughness: 0.12,
      transparent: true,
      opacity: 1,
    });

    const cardMesh = new THREE.Mesh(cardGeom, [frontMaterial, edgeMaterial]);
    cardMesh.castShadow = true;
    cardMesh.receiveShadow = true;
    cardGroup.add(cardMesh);
    animStateRef.current.frontMaterial = frontMaterial;
    animStateRef.current.edgeMaterial = edgeMaterial;

    // 4. Soft Dynamic Shadow
    const shadowGeom = new THREE.PlaneGeometry(5, 3.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0A2240,
      transparent: true,
      opacity: 0.14,
    });
    const shadowMesh = new THREE.Mesh(shadowGeom, shadowMat);
    shadowMesh.position.set(0, -1.6, -0.5);
    shadowMesh.rotation.x = -Math.PI / 2.2;
    scene.add(shadowMesh);
    animStateRef.current.shadowMesh = shadowMesh;

    // 5. Glowing Particle Trail System
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleAlphas: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = -999;
      particlePositions[i * 3 + 1] = -999;
      particlePositions[i * 3 + 2] = -999;
      particleAlphas.push(0);
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00D2FF,
      size: 0.065,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeom, particleMat);
    scene.add(particlePoints);
    animStateRef.current.particles = particlePoints;
    animStateRef.current.particlePositions = Array.from(particlePositions);
    animStateRef.current.particleAlphas = particleAlphas;

    // Procedural 4-point Twinkling Star Texture
    const createStarTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(canvas);

      const cx = 64;
      const cy = 64;

      // Soft cyan-blue radial aura
      const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
      aura.addColorStop(0, "rgba(255, 255, 255, 1)");
      aura.addColorStop(0.2, "rgba(0, 210, 255, 0.9)");
      aura.addColorStop(0.5, "rgba(15, 82, 186, 0.45)");
      aura.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.fill();

      // 4-Point Diamond Flare
      ctx.save();
      ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
      ctx.beginPath();
      ctx.moveTo(cx - 56, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - 6);
      ctx.quadraticCurveTo(cx, cy, cx + 56, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + 6);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(cx, cy - 56);
      ctx.quadraticCurveTo(cx, cy, cx + 6, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + 56);
      ctx.quadraticCurveTo(cx, cy, cx - 6, cy);
      ctx.closePath();
      ctx.fill();

      // Brilliant white center sparkle
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.restore();

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // 6. Dedicated 3D Twinkling Starburst System (380 Star Particles)
    const starCount = 380;
    const starPositions = new Float32Array(starCount * 3);
    const starVelocities: { x: number; y: number; z: number; speed: number; phase: number }[] = [];

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = 0;
      starPositions[i * 3 + 1] = 0;
      starPositions[i * 3 + 2] = -999;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const speed = 2.0 + Math.random() * 4.2;

      starVelocities.push({
        x: Math.sin(phi) * Math.cos(theta) * speed,
        y: Math.sin(phi) * Math.sin(theta) * speed,
        z: Math.cos(phi) * speed * 0.75,
        speed,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const starGeom = new THREE.BufferGeometry();
    starGeom.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starTexture = createStarTexture();
    const starMat = new THREE.PointsMaterial({
      map: starTexture,
      size: 0.35,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starPoints = new THREE.Points(starGeom, starMat);
    scene.add(starPoints);
    animStateRef.current.starPoints = starPoints;
    animStateRef.current.starVelocities = starVelocities;
    animStateRef.current.starMat = starMat;

    // 7. Animation Execution Loop
    let lastTimestamp = 0;
    let animationFrameId: number;

    const renderFrame = (t: number) => {
      const state = animStateRef.current;
      const card = state.cardMesh;
      const shadow = state.shadowMesh;
      const flash = state.flashLight;

      if (!card || !shadow) return;

      // STAGE 1: Debit card flies in from top-left corner (0.0s – 1.8s)
      if (t < 1.8) {
        const p = Math.min(1, Math.max(0, t / 1.8));
        // Smooth quadratic-cubic flight ease
        const eased = 1 - Math.pow(1 - p, 2.4);

        card.position.x = -9.2 * (1 - eased);
        card.position.y = 5.6 * (1 - eased);
        card.position.z = -2.0 * (1 - eased);

        card.rotation.x = 0.35 * (1 - eased) + 0.05;
        card.rotation.y = -0.75 * (1 - eased) - 0.2;
        card.rotation.z = -0.28 * (1 - eased) + 0.03;
        card.scale.set(1, 1, 1);
        card.visible = true;
        frontMaterial.opacity = 1;
        edgeMaterial.opacity = 1;

        shadow.position.x = card.position.x * 0.7;
        shadow.position.y = -1.6;
        shadow.scale.set(eased * 1.0, eased * 1.0, 1);
        (shadow.material as THREE.MeshBasicMaterial).opacity = 0.12 * eased;

        if (state.particles) {
          const positions = state.particles.geometry.attributes.position.array as Float32Array;
          const idx = Math.floor((t * 60) % particleCount);
          positions[idx * 3] = card.position.x - 0.6 + (Math.random() - 0.5) * 0.4;
          positions[idx * 3 + 1] = card.position.y + 0.4 + (Math.random() - 0.5) * 0.3;
          positions[idx * 3 + 2] = card.position.z - 0.3;
          state.particles.geometry.attributes.position.needsUpdate = true;
        }

        if (starMat) starMat.opacity = 0;
        if (flash) flash.intensity = 0;
      }
      // STAGE 2: Expanding to fill the entire screen for 5 seconds (1.8s – 5.0s)
      else if (t >= 1.8 && t < 5.0) {
        let zoomProgress = 1.0;
        if (t < 2.6) {
          zoomProgress = easeInOutCubic((t - 1.8) / 0.8);
        }

        const zPos = zoomProgress * 4.6;
        const scaleVal = 1 + zoomProgress * 2.3;
        const breathe = Math.sin((t - 2.6) * 1.5) * 0.02;

        card.position.x = 0;
        card.position.y = Math.sin((t - 1.8) * 0.8) * 0.04;
        card.position.z = zPos + breathe;

        card.rotation.x = (1 - zoomProgress) * 0.05 + Math.sin(t * 0.7) * 0.015;
        card.rotation.y = (1 - zoomProgress) * -0.2 + Math.cos(t * 0.6) * 0.02;
        card.rotation.z = (1 - zoomProgress) * 0.03;
        card.scale.set(scaleVal, scaleVal, 1);
        card.visible = true;
        frontMaterial.opacity = 1;
        edgeMaterial.opacity = 1;

        shadow.position.x = 0;
        shadow.position.y = -1.6;
        (shadow.material as THREE.MeshBasicMaterial).opacity = 0.14 * (1 - zoomProgress * 0.8);

        if (starMat) starMat.opacity = 0;
        if (flash) flash.intensity = zoomProgress > 0.8 ? (zoomProgress - 0.8) * 1.5 : 0;
      }
      // STAGE 3: Moves smoothly to center and starts disappearing into a burst of twinkling stars (5.0s – 6.2s)
      else if (t >= 5.0 && t < 6.2) {
        const centerProgress = Math.min(1, (t - 5.0) / 0.4);
        const easedCenter = easeOutCubic(centerProgress);

        const zPos = 4.6 * (1 - easedCenter);
        const scaleVal = (1 + 2.3 * (1 - easedCenter));

        card.position.x = 0;
        card.position.y = 0;
        card.position.z = zPos;
        card.rotation.x = 0.02 * (1 - easedCenter);
        card.rotation.y = 0.04 * (1 - easedCenter);
        card.rotation.z = 0;

        if (t >= 5.3) {
          const fadeCard = Math.min(1, (t - 5.3) / 0.6);
          frontMaterial.opacity = 1 - fadeCard;
          edgeMaterial.opacity = 1 - fadeCard;
          card.scale.set(scaleVal * (1 - fadeCard * 0.2), scaleVal * (1 - fadeCard * 0.2), 1);
          card.visible = fadeCard < 1.0;
        } else {
          card.scale.set(scaleVal, scaleVal, 1);
          card.visible = true;
          frontMaterial.opacity = 1;
          edgeMaterial.opacity = 1;
        }

        // 3D Twinkling Starburst Burst
        if (t >= 5.2 && starMat && starPoints && starVelocities) {
          const burstAge = t - 5.2;
          const burstDuration = 1.6;
          const burstProgress = Math.min(1, burstAge / burstDuration);

          starMat.opacity = Math.min(1, Math.sin(burstProgress * Math.PI) * 1.5);
          starMat.size = 0.36 + 0.14 * Math.sin(t * 16);

          const positions = starPoints.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < starCount; i++) {
            const v = starVelocities[i];
            const drag = Math.pow(0.88, burstAge * 18);
            const dist = (1 - drag) * v.speed * 1.4;
            const twinkle = 1 + 0.18 * Math.sin(t * 20 + v.phase);

            positions[i * 3] = v.x * dist * twinkle;
            positions[i * 3 + 1] = v.y * dist * twinkle;
            positions[i * 3 + 2] = v.z * dist;
          }
          starPoints.geometry.attributes.position.needsUpdate = true;
        }

        (shadow.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.12 * (1 - (t - 5.0) / 0.5));
        if (flash) {
          flash.intensity = (t >= 5.3 && t < 5.7) ? Math.sin((t - 5.3) / 0.4 * Math.PI) * 4 : 0;
        }
      }
      // STAGE 4 & 5: Sleek Custom Logo Reveal & Brand Hold (6.2s – 8.0s)
      else {
        card.visible = false;
        frontMaterial.opacity = 0;
        edgeMaterial.opacity = 0;
        (shadow.material as THREE.MeshBasicMaterial).opacity = 0;

        // Twinkling stars slowly dissipate
        if (t < 7.4 && starMat && starPoints && starVelocities) {
          const fadeProgress = (t - 6.2) / 1.2;
          starMat.opacity = Math.max(0, 0.7 * (1 - fadeProgress));
          const positions = starPoints.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < starCount; i++) {
            const v = starVelocities[i];
            const dist = 1.4 * v.speed + (t - 6.2) * 0.4;
            const twinkle = 1 + 0.12 * Math.sin(t * 14 + v.phase);
            positions[i * 3] = v.x * dist * twinkle;
            positions[i * 3 + 1] = v.y * dist * twinkle;
            positions[i * 3 + 2] = v.z * dist;
          }
          starPoints.geometry.attributes.position.needsUpdate = true;
        } else if (starMat) {
          starMat.opacity = 0;
        }

        if (flash) flash.intensity = 0;
      }

      renderer.render(scene, camera);
    };

    const animateLoop = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animateLoop);
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
      }
      const rawDelta = (timestamp - lastTimestamp) / 1000;
      const delta = Math.min(Math.max(0, rawDelta), 0.1);
      lastTimestamp = timestamp;

      if (animStateRef.current.isPlaying) {
        let nextTime = animStateRef.current.time + delta;
        
        // Start smooth fade-out 0.6 seconds before end in fullscreen mode
        const fadeOutThreshold = animStateRef.current.duration - 0.6;
        if (fullscreen && nextTime >= fadeOutThreshold && !isFadingOutRef.current) {
          isFadingOutRef.current = true;
          setIsFadingOut(true);
        }

        if (nextTime >= animStateRef.current.duration) {
          if (loop) {
            nextTime = 0;
          } else {
            nextTime = animStateRef.current.duration;
            animStateRef.current.isPlaying = false;
            setIsPlaying(false);
            if (onComplete) onComplete();
          }
        }

        animStateRef.current.time = nextTime;
        setCurrentTime(nextTime);

        // Normalize time to standard 8.0s curve so all stages map smoothly regardless of total duration
        const normalizedTime = (nextTime / animStateRef.current.duration) * 8.0;

        if (normalizedTime < 1.8) {
          setActivePhase("Phase 1: Top-Left Card Flight (0–1.8s)");
        } else if (normalizedTime < 5.0) {
          setActivePhase("Phase 2: Full-Screen Expansion (1.8–5.0s)");
        } else if (normalizedTime < 6.2) {
          setActivePhase("Phase 3: Center Ease & Twinkling Starburst (5.0–6.2s)");
        } else if (normalizedTime < 7.4) {
          setActivePhase("Phase 4: Sleek Custom Logo Reveal (6.2–7.4s)");
        } else {
          setActivePhase("Phase 5: Brand Identity Hold (7.4–8.0s)");
        }

        renderFrame(normalizedTime);
      }
    };

    // Support URL time scrubbing: e.g. /?revealTime=3.5 or /reveal?time=5.6
    let initialTime = 0;
    if (typeof window !== "undefined") {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const paramVal = urlParams.get("revealTime") || urlParams.get("time");
        if (paramVal !== null) {
          const parsed = parseFloat(paramVal);
          if (!isNaN(parsed) && parsed >= 0) {
            initialTime = Math.min(parsed, totalDuration);
          }
        }
      } catch (e) {
        // Ignore URL parsing errors
      }
    }

    if (initialTime > 0) {
      animStateRef.current.time = initialTime;
      setCurrentTime(initialTime);
      renderFrame(initialTime);
    } else {
      renderFrame(0);
    }

    animationFrameId = requestAnimationFrame(animateLoop);

    // Global seek helper for automated tests & keyframe verification
    if (typeof window !== "undefined") {
      (window as any).__seekRevealTime = (t: number) => {
        animStateRef.current.time = t;
        setCurrentTime(t);
        renderFrame(t);
      };
    }

    // Reliable safety timer matching total duration in fullscreen mode
    let safetyTimer: NodeJS.Timeout | null = null;
    if (fullscreen) {
      safetyTimer = setTimeout(() => {
        if (onComplete) onComplete();
      }, (totalDuration + 0.2) * 1000);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (safetyTimer) clearTimeout(safetyTimer);
      if (fullscreen) {
        window.removeEventListener("resize", handleResize);
        document.body.style.overflow = "";
      }
      renderer.dispose();
      cardGeom.dispose();
      frontMaterial.dispose();
      edgeMaterial.dispose();
      shadowGeom.dispose();
      shadowMat.dispose();
      starGeom.dispose();
      starMat.dispose();
      starTexture.dispose();
    };
  }, [loop, onComplete, fullscreen]);

  // Controls Handlers
  const handlePlayPause = () => {
    if (currentTime >= totalDuration) {
      animStateRef.current.time = 0;
      setCurrentTime(0);
      animStateRef.current.isPlaying = true;
      setIsPlaying(true);
    } else {
      const nextState = !isPlaying;
      animStateRef.current.isPlaying = nextState;
      setIsPlaying(nextState);
    }
  };

  const handleRestart = () => {
    animStateRef.current.time = 0;
    setCurrentTime(0);
    animStateRef.current.isPlaying = true;
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    animStateRef.current.time = seekTime;
    setCurrentTime(seekTime);
  };

  // Video Export Functionality
  const handleRecordVideo = useCallback(async () => {
    if (!canvasRef.current || isRecording) return;
    setIsRecording(true);
    setRecordProgress(0);

    animStateRef.current.time = 0;
    setCurrentTime(0);
    animStateRef.current.isPlaying = false;
    setIsPlaying(false);

    try {
      const stream = canvasRef.current.captureStream(60);
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
          ? "video/webm;codecs=vp9"
          : "video/webm",
        videoBitsPerSecond: 16000000,
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ToucanPay_3D_Logo_Reveal_1080p.webm";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsRecording(false);
      };

      recorder.start();
      animStateRef.current.isPlaying = true;
      setIsPlaying(true);

      const checkInterval = setInterval(() => {
        const t = animStateRef.current.time;
        setRecordProgress(Math.min(100, Math.round((t / totalDuration) * 100)));
        if (t >= totalDuration - 0.05) {
          clearInterval(checkInterval);
          recorder.stop();
        }
      }, 50);
    } catch (err) {
      console.error("Recording error:", err);
      setIsRecording(false);
    }
  }, [isRecording, totalDuration]);

  // Logo Reveal Calculations mapped to total duration
  const normTime = (currentTime / totalDuration) * 8.0;
  const isLogoVisible = normTime >= 6.0;
  const logoProgress = Math.min(1, Math.max(0, (normTime - 6.0) / 0.9));
  const logoScale = 0.94 + 0.06 * easeOutCubic(logoProgress);
  const logoOpacity = Math.min(1, logoProgress * 1.5);

  const sheenProgress = Math.min(1, Math.max(0, (normTime - 6.1) / 0.95));
  const sheenPosition = -120 + sheenProgress * 340;

  let flashOpacity = 0;
  if (normTime >= 5.3 && normTime < 5.5) {
    flashOpacity = ((normTime - 5.3) / 0.2) * 0.45;
  } else if (normTime >= 5.5 && normTime < 5.9) {
    flashOpacity = (1 - (normTime - 5.5) / 0.4) * 0.45;
  }

  // -------------------------------------------------------------
  // FULLSCREEN INTRO MODE (Step 2: 100vw, 100vh, 100dvh, object-fit: cover, 5-second timer)
  // -------------------------------------------------------------
  if (fullscreen) {
    return (
      <div 
        ref={containerRef}
        className={`fixed inset-0 z-[99999] w-[100vw] h-[100vh] h-[100dvh] overflow-hidden bg-white select-none m-0 p-0 transition-opacity duration-600 ease-out flex items-center justify-center ${
          isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
        } ${className}`}
        style={{ width: "100vw", height: "100dvh" }}
      >
        {/* Subtle Light-Cream & Pale-Blue Ambient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] via-[#FAF7F2] to-[#EBF4FC] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[650px] bg-gradient-to-r from-[#0F52BA]/10 via-[#00D2FF]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Full-Viewport 3D WebGL Canvas */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="relative z-10 w-full h-full object-cover object-center block"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />

        {/* Blue-White Light Burst Transition */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-br from-[#FFFFFF] via-[#E8F3FF] to-[#FFFFFF] transition-opacity"
          style={{ opacity: flashOpacity }}
        />

        {/* Official ToucanPay Logo Reveal */}
        {isLogoVisible && (
          <div 
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity: logoOpacity }}
          >
            <div 
              className="relative px-8 py-6 rounded-3xl overflow-hidden transition-transform duration-75 ease-out"
              style={{ transform: `scale(${logoScale})` }}
            >
              <div className="absolute inset-0 bg-radial-gradient from-[#0F52BA]/15 via-transparent to-transparent rounded-full blur-2xl" />

              <div className="relative flex items-center justify-center">
                <img
                  src={asset("/brand/logo.svg")}
                  alt="ToucanPay Official Logo"
                  className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto object-contain drop-shadow-[0_4px_16px_rgba(15,82,186,0.12)]"
                />

                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(115deg, transparent 35%, rgba(0, 210, 255, 0.5) 48%, rgba(255, 255, 255, 0.95) 50%, rgba(15, 82, 186, 0.4) 54%, transparent 68%)`,
                    transform: `translateX(${sheenPosition}%) skewX(-20deg)`,
                    mixBlendMode: "overlay",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // PREVIEW / CARD MODE (For /reveal Preview Route)
  // -------------------------------------------------------------
  return (
    <div className={`relative w-full aspect-video max-w-6xl mx-auto rounded-3xl overflow-hidden bg-white shadow-2xl border border-[#E5DEC9] select-none ${className}`}>
      
      {/* 1. Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFFFFF] via-[#FAF7F2] to-[#EBF4FC] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-[#0F52BA]/10 via-[#00D2FF]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* 2. WebGL 3D Canvas */}
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="relative z-10 w-full h-full object-cover"
      />

      {/* 3. Blue-White Light Flash */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-br from-[#FFFFFF] via-[#E8F3FF] to-[#FFFFFF] transition-opacity"
        style={{ opacity: flashOpacity }}
      />

      {/* 4. Official ToucanPay Logo Reveal */}
      {isLogoVisible && (
        <div 
          className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: logoOpacity }}
        >
          <div 
            className="relative px-8 py-6 rounded-3xl overflow-hidden transition-transform duration-75 ease-out"
            style={{ transform: `scale(${logoScale})` }}
          >
            <div className="absolute inset-0 bg-radial-gradient from-[#0F52BA]/15 via-transparent to-transparent rounded-full blur-2xl" />

            <div className="relative flex items-center justify-center">
              <img
                src={asset("/brand/logo.svg")}
                alt="ToucanPay Official Logo"
                className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto object-contain drop-shadow-[0_4px_16px_rgba(15,82,186,0.12)]"
              />

              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(115deg, transparent 35%, rgba(0, 210, 255, 0.5) 48%, rgba(255, 255, 255, 0.95) 50%, rgba(15, 82, 186, 0.4) 54%, transparent 68%)`,
                  transform: `translateX(${sheenPosition}%) skewX(-20deg)`,
                  mixBlendMode: "overlay",
                }}
              />
            </div>

            {currentTime >= 6.8 && (
              <div 
                className="text-center mt-4 transition-all duration-500 ease-out flex items-center justify-center gap-2"
                style={{
                  opacity: Math.min(1, (currentTime - 6.8) / 0.5),
                  transform: `translateY(${Math.max(0, (7.3 - currentTime) * 10)}px)`,
                }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#E5DEC9] shadow-subtle text-xs sm:text-sm font-bold text-[#0C1E38] backdrop-blur-md">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>RBI-Licensed Payments Platform for India & Global Rails</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Cinematic Overlay Controls Bar */}
      {showControls && (
        <div className="absolute bottom-0 inset-x-0 z-40 bg-gradient-to-t from-white/95 via-white/80 to-transparent p-4 sm:p-6 backdrop-blur-sm border-t border-[#E5DEC9]/50 flex flex-col gap-3">
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#0F52BA] w-12 text-left">
              {currentTime.toFixed(2)}s
            </span>

            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max="8.0"
                step="0.02"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-[#E5DEC9] rounded-lg appearance-none cursor-pointer accent-[#0F52BA]"
              />
              <div className="absolute left-[22.5%] -top-1 w-2 h-2 rounded-full bg-[#136FC6]/40 pointer-events-none" title="Phase 2: Screen Fill (1.8s)" />
              <div className="absolute left-[62.5%] -top-1 w-2 h-2 rounded-full bg-[#E9953E] pointer-events-none" title="Phase 3: Starburst Disappearance (5.0s)" />
              <div className="absolute left-[77.5%] -top-1 w-2 h-2 rounded-full bg-[#00D2FF] pointer-events-none" title="Phase 4: Logo Reveal (6.2s)" />
              <div className="absolute left-[92.5%] -top-1 w-2 h-2 rounded-full bg-[#10B981] pointer-events-none" title="Phase 5: Brand Hold (7.4s)" />
            </div>

            <span className="text-xs font-mono font-bold text-ink-secondary w-12 text-right">
              8.00s
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="px-4 py-2 rounded-xl bg-[#0F52BA] hover:bg-[#136FC6] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isPlaying ? "Pause" : (currentTime >= totalDuration ? "Replay" : "Play")}</span>
              </button>

              <button
                type="button"
                onClick={handleRestart}
                aria-label="Restart Animation"
                className="p-2 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#E5DEC9] text-[#0C1E38] transition-all shadow-subtle active:scale-95"
                title="Restart Reveal"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF2FC] text-[#0F52BA] border border-[#BFD7F5] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
                <span>60 FPS Cinema Mode</span>
              </div>
            </div>

            <div className="hidden sm:block text-xs font-semibold text-[#4A5B73]">
              <span className="text-ink-tertiary">Current: </span>
              <span className="text-[#0F52BA] font-bold">{activePhase}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRecordVideo}
                disabled={isRecording}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                  isRecording 
                    ? "bg-amber-50 border-amber-300 text-amber-700 animate-pulse" 
                    : "bg-white hover:bg-[#FAF7F2] border-[#E5DEC9] text-[#0C1E38] shadow-subtle active:scale-95"
                }`}
                title="Export 1080p 60FPS Video"
              >
                <Download className="w-3.5 h-3.5 text-[#0F52BA]" />
                <span>{isRecording ? `Recording (${recordProgress}%)...` : "Export 1080p Video"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (containerRef.current) {
                    if (!document.fullscreenElement) {
                      containerRef.current.requestFullscreen().catch(() => {});
                    } else {
                      document.exitFullscreen().catch(() => {});
                    }
                  }
                }}
                className="p-2 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#E5DEC9] text-[#0C1E38] transition-all shadow-subtle"
                title="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}