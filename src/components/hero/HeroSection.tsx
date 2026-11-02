"use client";

import React from "react";
import Link from "next/link";
import { PlusCircle, ArrowRight, ShieldCheck, Activity, Sparkles } from "lucide-react";
import HeroVisual from "./HeroVisual";
import GlassAiButton from "@/components/ui/GlassAiButton";

export default function HeroSection() {
  return (
    <section className="relative pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden bg-[#FAF7F2]">
      {/* Warm Light Cream & Royal Blue Ambient Lighting */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-[#EBF3FC]/70 via-[#F5F1E8]/50 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Balanced Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Headlines, 3D Glass AI Buttons & Capability checks */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Top RBI Authorized Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white border border-[#E5DEC9] shadow-subtle">
              <div className="w-5 h-5 rounded-full overflow-hidden bg-[#FAF6E8] flex items-center justify-center shrink-0">
                <img src="/brand/rbi.svg" alt="RBI" className="w-4 h-4 object-contain" />
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-bold text-[#0C1E38]">RBI Authorized</span>
                <span className="text-[#7D8CA3] text-[10px]">•</span>
                <span className="text-[#4A5B73] text-[11px] font-medium">PA-CB Regulatory Framework</span>
              </div>
            </div>

            {/* Headline with Royal Blue Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0C1E38] tracking-tight leading-[1.12]">
              Regulated Payments<br />
              Infrastructure.<br />
              <span className="text-[#0F52BA]">One Connected Platform.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#4A5B73] leading-relaxed max-w-xl">
              Accept, collect, settle and grow with Toucan&apos;s SuperStream orchestration layer for domestic and cross-border payments.
            </p>

            {/* 3D Glass AI Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <GlassAiButton
                href="/onboarding"
                variant="royal"
                icon="arrow"
              >
                Book a Demo
              </GlassAiButton>

              <GlassAiButton
                href="/dashboard"
                variant="cream"
                icon="zap"
              >
                Explore the Platform
              </GlassAiButton>
            </div>

            {/* 3 Capabilities Feature Row */}
            <div className="pt-4 flex flex-wrap items-center gap-5 sm:gap-6 text-xs text-[#4A5B73]">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-100/70 text-[#0F52BA] flex items-center justify-center">
                  <PlusCircle className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-[#0C1E38]">Domestic Payment Acceptance</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-100/70 text-[#0F52BA] flex items-center justify-center">
                  <PlusCircle className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-[#0C1E38]">Bill Collections & Recurring Payments</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-100/70 text-[#0F52BA] flex items-center justify-center">
                  <PlusCircle className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-[#0C1E38]">Cross-border Payments & Settlement</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Place 1 for 3D Hero Composition Image */}
          <div className="lg:col-span-6 w-full">
            <HeroVisual />
          </div>

        </div>

      </div>
    </section>
  );
}
