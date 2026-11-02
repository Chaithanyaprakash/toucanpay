"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Sparkles, 
  Film, 
  CheckCircle2, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Download,
  Share2
} from "lucide-react";
import ToucanLogoReveal from "@/components/3d/ToucanLogoReveal";

export default function RevealPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const STORYBOARD = [
    {
      time: "0.0s – 1.8s",
      title: "1. Top-Left Card Flight",
      desc: "Sleek beveled debit card flies in rapidly from the top left corner, gliding diagonally with metallic bevel reflections, golden EMV chip, and cyan particle trail.",
      icon: Zap,
      color: "bg-blue-50 text-[#0F52BA] border-blue-200"
    },
    {
      time: "1.8s – 5.0s",
      title: "2. Full-Screen Expansion (5s Screen Fill)",
      desc: "Card accelerates toward camera, expanding to fill the entire screen for 5 seconds with realistic perspective depth, glossy finish, and dynamic studio lighting reflections.",
      icon: Film,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200"
    },
    {
      time: "5.0s – 6.2s",
      title: "3. Center Move & Twinkling Starburst",
      desc: "Card moves smoothly to the center and starts disappearing into a spectacular burst of twinkling stars, radiating 3D diamond sparkles in electric cyan, royal blue, and gold.",
      icon: Sparkles,
      color: "bg-sky-50 text-[#0284C7] border-sky-200"
    },
    {
      time: "6.2s – 7.4s",
      title: "4. Sleek Custom Logo Fade-In",
      desc: "Smooth fade-in and scale-up of the sleek custom ToucanPay logo amidst drifting stars, illuminated by cinematic studio lighting and a holographic diagonal light sweep.",
      icon: Layers,
      color: "bg-amber-50 text-[#E9953E] border-amber-200"
    },
    {
      time: "7.4s – 8.0s",
      title: "5. Brand Hold & Transition",
      desc: "Crisp centered logo held against pure white background with subtle ambient glow, followed by a smooth 600ms opacity transition to the platform.",
      icon: ShieldCheck,
      color: "bg-emerald-50 text-[#10B981] border-emerald-200"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0C1E38] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5DEC9]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4A5B73] hover:text-[#0F52BA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to ToucanPay Platform</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DEC9] shadow-subtle text-xs font-bold text-[#0F52BA]">
              <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>Cinematic 3D Brand Reveal</span>
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#F5F1E8] border border-[#E5DEC9] text-xs font-semibold text-[#4A5B73] transition-all shadow-subtle"
              title="Copy Page Link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? "Copied!" : "Share"}</span>
            </button>
          </div>
        </div>

        {/* Page Title & Context */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0F52BA] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            OFFICIAL BRAND CINEMATIC SEQUENCE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0C1E38] tracking-tight">
            ToucanPay 3D Logo Reveal
          </h1>
          <p className="text-sm sm:text-base text-[#4A5B73] leading-relaxed">
            High-fidelity 60 FPS 3D motion graphics brand intro: debit card flies in from top-left, expands to fill the entire screen for 5 seconds, moves to center and disappears into a burst of twinkling stars, followed by a sleek custom logo fade-in (8-second duration).
          </p>
        </div>

        {/* Centerpiece: 16:9 WebGL 3D Animation Component */}
        <div className="w-full">
          <ToucanLogoReveal autoPlay={true} loop={false} showControls={true} />
        </div>

        {/* Storyboard 5-Stage Breakdown */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0C1E38] tracking-tight">
              Animation Sequence & Storyboard
            </h2>
            <span className="text-xs font-mono font-bold text-[#0F52BA] bg-[#EBF2FC] px-3 py-1 rounded-full border border-[#BFD7F5]">
              Exact 8.00s Timeline
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {STORYBOARD.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5DEC9] shadow-subtle flex flex-col justify-between space-y-3 hover:border-[#0F52BA] hover:shadow-card transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-[#0F52BA]">
                        {stage.time}
                      </span>
                      <div className={`w-7 h-7 rounded-lg border flex items-center justify-center ${stage.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#0C1E38]">
                      {stage.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#4A5B73] leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technical Specifications Specs Bar */}
        <div className="p-6 rounded-3xl bg-white border border-[#E5DEC9] shadow-subtle grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#7D8CA3]">Resolution</p>
            <p className="text-sm font-bold text-[#0C1E38] mt-1">1920 × 1080 (16:9)</p>
            <p className="text-[10px] text-ink-secondary">Native High-DPI Cinema</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#7D8CA3]">Frame Rate</p>
            <p className="text-sm font-bold text-[#0F52BA] mt-1">60 FPS Smooth</p>
            <p className="text-[10px] text-ink-secondary">Hardware Accelerated</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#7D8CA3]">Lighting & Depth</p>
            <p className="text-sm font-bold text-[#0C1E38] mt-1">Studio 3-Point PBR</p>
            <p className="text-[10px] text-ink-secondary">Specular Metallic Shimmer</p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#7D8CA3]">Brand Identity</p>
            <p className="text-sm font-bold text-[#E9953E] mt-1">ToucanPay Official</p>
            <p className="text-[10px] text-ink-secondary">Original Vector Proportions</p>
          </div>
        </div>

      </div>
    </div>
  );
}