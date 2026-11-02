"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import GlassAiButton from "@/components/ui/GlassAiButton";
import Scroll3DCard from "@/components/ui/Scroll3DCard";

export default function AnalyticsSection() {
  return (
    <section id="dashboards" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E5DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 1. LEFT: Copy & Glass AI Button */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7D8CA3]">
              POWERFUL DASHBOARDS
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1E38] tracking-tight leading-tight">
              Real-time visibility<br />across your payments
            </h2>

            <p className="text-sm sm:text-base text-[#4A5B73] leading-relaxed">
              Track transactions, settlements, refunds and more from a single, intuitive dashboard.
            </p>

            <div className="pt-2">
              <GlassAiButton
                href="/dashboard"
                variant="royal"
                icon="arrow"
              >
                View Dashboard Demo
              </GlassAiButton>
            </div>
          </div>

          {/* 2. RIGHT: Place 3 for User's High-Fidelity Dashboard Mockup Image with 3D Tilt */}
          <div className="lg:col-span-8 w-full">
            <Scroll3DCard maxTilt={4} perspective={1100} scale={1.01}>
              <div className="relative rounded-3xl bg-white border border-[#E5DEC9] p-2.5 sm:p-4 shadow-elevated overflow-hidden group">
                
                {/* Subtle Ambient Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F52BA]/5 blur-3xl pointer-events-none" />

                {/* Exact User Uploaded Image 3 (Dashboard Mockup) */}
                <div className="relative w-full rounded-2xl overflow-hidden">
                  <img
                    src="/brand/dashboard_preview_mockup.png"
                    alt="ToucanPay Powerful Dashboard Interface"
                    className="w-full h-auto object-contain rounded-2xl transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </div>

                {/* Interactive Tooltip on Hover */}
                <div className="absolute bottom-5 right-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[11px] font-bold text-[#0F52BA] bg-white/95 px-3 py-1.5 rounded-full border border-[#E5DEC9] shadow-subtle flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-success animate-ping" />
                    <span>Real-Time Production Data Stream</span>
                  </span>
                </div>

              </div>
            </Scroll3DCard>
          </div>

        </div>

      </div>
    </section>
  );
}
