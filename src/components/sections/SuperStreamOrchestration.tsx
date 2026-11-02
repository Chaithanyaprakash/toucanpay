"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  GitBranch, 
  TrendingUp, 
  Activity, 
  ShieldCheck, 
  FileCheck2,
  Zap
} from "lucide-react";
import GlassAiButton from "@/components/ui/GlassAiButton";
import Scroll3DCard from "@/components/ui/Scroll3DCard";

export default function SuperStreamOrchestration() {
  const features = [
    { title: "Smart routing & failover", icon: GitBranch },
    { title: "Higher success rates", icon: TrendingUp },
    { title: "Real-time monitoring", icon: Activity },
    { title: "Regulatory compliance", icon: ShieldCheck },
    { title: "Simplified reconciliation", icon: FileCheck2 },
  ];

  return (
    <section id="superstream" className="py-16 sm:py-24 bg-[#F5F1E8] border-t border-[#E5DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Layout matching template */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* 1. LEFT: Copy & Glass AI Button */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7D8CA3]">
              TOUCAN SUPERSTREAM
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1E38] tracking-tight leading-tight">
              Intelligent orchestration<br />for reliable payments
            </h2>

            <p className="text-sm sm:text-base text-[#4A5B73] leading-relaxed">
              SuperStream dynamically routes transactions across multiple partners, ensures higher success rates and simplifies settlement and reconciliation.
            </p>

            <div className="pt-2">
              <GlassAiButton
                href="/onboarding"
                variant="royal"
                icon="zap"
              >
                Learn About SuperStream
              </GlassAiButton>
            </div>
          </div>

          {/* 2. CENTER: Place 2 for User's 3D Orchestration Diagram with 3D Tilt */}
          <div className="lg:col-span-5 w-full max-w-[460px] mx-auto">
            <Scroll3DCard maxTilt={5} perspective={1000} scale={1.01}>
              <div className="relative rounded-3xl bg-white border border-[#E5DEC9] shadow-elevated p-3 sm:p-4 overflow-hidden group">
                
                {/* Subtle Ambient Backing */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] to-white opacity-60 pointer-events-none" />

                {/* Exact User Uploaded Image 2 (SuperStream Orchestration Diagram) */}
                <div className="relative w-full rounded-2xl overflow-hidden">
                  <img
                    src="/brand/superstream_orchestration_diagram.png"
                    alt="Toucan SuperStream Dynamic Orchestration"
                    className="w-full h-auto object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.015]"
                  />
                </div>

                {/* Subtle Hover Telemetry */}
                <div className="absolute bottom-4 inset-x-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-bold text-[#0F52BA] bg-white/95 px-3 py-1 rounded-full border border-[#E5DEC9] shadow-subtle">
                    Live Dynamic Routing • Instant Failover Enabled
                  </span>
                </div>

              </div>
            </Scroll3DCard>
          </div>

          {/* 3. RIGHT: Feature List matching template */}
          <div className="lg:col-span-3 space-y-3.5 text-left">
            {features.map((feature, fIdx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={fIdx}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#E5DEC9] shadow-subtle hover:border-[#0F52BA] hover:shadow-card transition-all"
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0F52BA] border border-blue-100 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#0C1E38]">
                    {feature.title}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
