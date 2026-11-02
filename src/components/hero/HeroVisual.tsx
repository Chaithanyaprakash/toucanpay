"use client";

import React, { useRef, useState, useEffect } from "react";
import Scroll3DCard from "@/components/ui/Scroll3DCard";
import { asset } from "@/lib/assets";
import { 
  Play, 
  Pause, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";

export default function HeroVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="relative w-full max-w-[640px] mx-auto select-none">
      
      {/* Gentle Floating Animation Wrapper */}
      <div className="animate-hero-float">
        
        {/* Top Status Bar: UPI • Visa • RuPay Active */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-[#E5DEC9] shadow-subtle text-xs font-bold text-[#0C1E38] backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            <span className="text-[11px] font-semibold text-[#0F52BA]">SuperStream Active</span>
            <span className="text-ink-tertiary text-[10px]">•</span>
            <span className="text-[11px] font-medium text-ink-secondary">99.99% Routing Switch</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#BFD7F5] text-[11px] font-bold text-[#0F52BA]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0F52BA]" />
            <span>RBI PA-CB Direct</span>
          </div>
        </div>

        {/* Cursor-Based 3D Tilt Card (Webflow Reference Interaction) */}
        <Scroll3DCard maxTilt={7} perspective={1150} scale={1.015}>
          <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#F5F1E8] border-2 border-[#E5DEC9] shadow-2xl overflow-hidden p-2 sm:p-3 group">
            
            {/* Ambient Radial Backing & Glow */}
            <div className="absolute inset-0 bg-radial-gradient opacity-50 pointer-events-none" />
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#0F52BA]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-[#136FC6]/15 blur-3xl pointer-events-none" />

            {/* Video Canvas Stage with Glass Border */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-[#08182E] shadow-inner aspect-[16/10] flex items-center justify-center">
              
              {/* Gemini-Generated 3D Fintech Video */}
              <video
                ref={videoRef}
                src={asset("/brand/toucan_hero_video.mp4")}
                poster={asset("/brand/hero_3d_composition.png")}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              />

              {/* Animated Glowing Blue Connection Lines Overlay */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 600 375" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="heroBlueGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D2FF" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#0F52BA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2855C5" stopOpacity="0.3" />
                  </linearGradient>

                  <filter id="heroGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <path 
                  d="M 60 60 L 160 110 L 250 160" 
                  stroke="url(#heroBlueGlow)" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  filter="url(#heroGlowFilter)"
                  className="animate-circuit-flow opacity-80"
                />
                <circle cx="60" cy="60" r="4" fill="#00D2FF" className="animate-pulse-glow" />

                <path 
                  d="M 540 65 L 430 115 L 350 165" 
                  stroke="url(#heroBlueGlow)" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  filter="url(#heroGlowFilter)"
                  className="animate-circuit-flow opacity-80"
                />
                <circle cx="540" cy="65" r="4" fill="#00D2FF" className="animate-pulse-glow" />

                <path 
                  d="M 70 310 L 170 260 L 260 210" 
                  stroke="url(#heroBlueGlow)" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  filter="url(#heroGlowFilter)"
                  className="animate-circuit-flow opacity-80"
                />
                <circle cx="70" cy="310" r="4" fill="#00D2FF" className="animate-pulse-glow" />

                <path 
                  d="M 530 305 L 420 255 L 340 210" 
                  stroke="url(#heroBlueGlow)" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  filter="url(#heroGlowFilter)"
                  className="animate-circuit-flow opacity-80"
                />
                <circle cx="530" cy="305" r="4" fill="#00D2FF" className="animate-pulse-glow" />
              </svg>

              {/* Node Badges */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 pointer-events-none">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#0A2240]/80 backdrop-blur-md border border-[#00D2FF]/30 shadow-lg text-white">
                  <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-ping" />
                  <span className="text-[10px] sm:text-xs font-bold tracking-tight text-white">Instant UPI Rail</span>
                </div>
              </div>

              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 pointer-events-none">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0A2240]/80 backdrop-blur-md border border-[#BFD7F5]/30 shadow-lg text-white">
                  <Zap className="w-3 h-3 text-amber-300" />
                  <span className="text-[10px] sm:text-xs font-bold tracking-tight text-white">Smart Routing</span>
                </div>
              </div>

              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 pointer-events-none">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0A2240]/80 backdrop-blur-md border border-emerald-400/30 shadow-lg text-white">
                  <Globe2 className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] sm:text-xs font-bold tracking-tight text-emerald-100">Cross-Border FX</span>
                </div>
              </div>

              {/* Play/Pause Control */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause Hero Video" : "Play Hero Video"}
                  className="w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md border border-white/40 text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5 fill-white text-white" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                  )}
                </button>
              </div>

            </div>

            {/* Bottom Telemetry Bar */}
            <div className="mt-2.5 px-2 py-1.5 flex items-center justify-between text-[11px] text-[#4A5B73]">
              <div className="flex items-center gap-1.5 font-semibold text-[#0C1E38]">
                <Sparkles className="w-3.5 h-3.5 text-[#0F52BA]" />
                <span>Toucan 3D Engine • Real-time Transaction Visualizer</span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[#0F52BA] font-bold">
                <span>Multi-Rail Live</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>
        </Scroll3DCard>

      </div>

    </div>
  );
}