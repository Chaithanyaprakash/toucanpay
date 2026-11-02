"use client";

import React from "react";
import GlassAiButton from "@/components/ui/GlassAiButton";
import { CheckCircle2 } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="py-14 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rounded Royal Blue Gradient Card Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0F52BA] via-[#136FC6] to-[#0A2540] p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden border border-[#BFD7F5]/20">
          
          {/* Subtle background ambient mesh */}
          <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" />
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute -left-16 -top-16 w-72 h-72 rounded-full border border-white/10 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            {/* Left Copy */}
            <div className="max-w-2xl text-left space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-cream-100 text-xs font-semibold backdrop-blur-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-cream-200" />
                <span>Zero-friction RBI-compliant migration</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAF7F2] tracking-tight leading-tight">
                Ready to modernize your payment infrastructure?
              </h2>
              <p className="text-sm sm:text-base text-[#D4E4FC] font-normal leading-relaxed">
                Connect with our payment architecture team and explore live sandbox testing with Toucan SuperStream routing engine.
              </p>
            </div>

            {/* Right Buttons: Glass AI 3D Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <GlassAiButton 
                variant="cream" 
                size="lg" 
                icon="arrow" 
                href="/onboarding"
              >
                Book a Live Demo
              </GlassAiButton>
              <GlassAiButton 
                variant="outline" 
                size="lg" 
                icon="zap" 
                href="/dashboard"
                className="!border-white/30 !text-white hover:!bg-white/15"
              >
                Explore Sandbox
              </GlassAiButton>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
