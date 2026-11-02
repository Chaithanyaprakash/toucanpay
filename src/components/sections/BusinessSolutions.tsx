"use client";

import React from "react";
import { 
  CreditCard, 
  Cpu, 
  CheckCircle2, 
  Landmark, 
  Zap, 
  ShoppingCart, 
  Briefcase, 
  MoreHorizontal,
  ArrowRight,
  Globe2
} from "lucide-react";
import Scroll3DCard from "@/components/ui/Scroll3DCard";
import Interactive3DGlobe from "@/components/ui/Interactive3DGlobe";

export default function BusinessSolutions() {
  const steps = [
    {
      title: "Customer Pays",
      description: "UPI, Cards, Net Banking and more",
      icon: CreditCard,
    },
    {
      title: "Processing",
      description: "Smart routing through trusted partners",
      icon: Cpu,
    },
    {
      title: "Confirmation",
      description: "Real-time status updates and notifications",
      icon: CheckCircle2,
    },
    {
      title: "Settlement",
      description: "Funds settlement and reconciliation",
      icon: Landmark,
    },
  ];

  const industries = [
    {
      title: "Financial Services",
      subtitle: "NBFCs, Lenders, Fintechs",
      icon: Landmark,
    },
    {
      title: "Consumer Utilities",
      subtitle: "BFSI, Telco, Utilities",
      icon: Zap,
    },
    {
      title: "E-commerce",
      subtitle: "Marketplaces, D2C Brands",
      icon: ShoppingCart,
    },
    {
      title: "B2B Collections",
      subtitle: "Enterprises, Platforms",
      icon: Briefcase,
    },
    {
      title: "And more...",
      subtitle: "Healthcare, Education, Travel and beyond",
      icon: MoreHorizontal,
    },
  ];

  return (
    <div className="w-full">
      
      {/* 1. HOW PAYMENTS FLOW SECTION (Light Cream Theme) */}
      <section id="flow" className="py-16 sm:py-24 bg-[#F5F1E8] border-t border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 text-left">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7D8CA3]">
              HOW PAYMENTS FLOW
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1E38] tracking-tight mt-2">
              A seamless journey<br />from customer to settlement
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4A5B73] leading-relaxed">
              Fast, secure and reliable payment processing with end-to-end visibility.
            </p>
          </div>

          {/* 4 Pipeline Steps with Connectors & 3D Tilt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative flex flex-col items-start">
                  
                  {/* Step Card with 3D Tilt */}
                  <Scroll3DCard maxTilt={5} perspective={900} scale={1.02}>
                    <div className="w-full p-6 rounded-2xl bg-white border border-[#E5DEC9] shadow-subtle hover:border-[#0F52BA] hover:shadow-card transition-all flex flex-col items-start h-full">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0F52BA] border border-blue-100 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className="text-base font-bold text-[#0C1E38]">
                        {step.title}
                      </h3>

                      <p className="mt-1 text-xs text-[#4A5B73] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </Scroll3DCard>

                  {/* Dotted Arrow Connector (Desktop only) */}
                  {idx < steps.length - 1 && (
                    <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#7D8CA3]">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. INDUSTRIES WE SERVE & INTERACTIVE 3D GLOBE */}
      <section id="industries" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E5DEC9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl text-left">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#7D8CA3]">
                INDUSTRIES WE SERVE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1E38] tracking-tight mt-2">
                Built for modern businesses
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#4A5B73] leading-relaxed">
                Toucan supports regulated payment needs across diverse industries worldwide.
              </p>
            </div>

            {/* Interactive 3D Globe Badge */}
            <div className="flex items-center gap-2 self-start lg:self-auto px-3.5 py-1.5 rounded-full bg-white border border-[#E5DEC9] text-xs font-bold text-[#0F52BA] shadow-subtle">
              <Globe2 className="w-4 h-4" />
              <span>Interactive Cross-Border Global Rail</span>
            </div>
          </div>

          {/* 5 Industry Cards in a Row with 3D Tilt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-14">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              return (
                <Scroll3DCard key={idx} maxTilt={6} perspective={800} scale={1.02}>
                  <div className="p-5 rounded-2xl bg-white border border-[#E5DEC9] shadow-subtle hover:shadow-card hover:border-[#0F52BA] transition-all flex flex-col justify-between group h-full">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0F52BA] border border-blue-100 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                        <Icon className="w-5 h-5" />
                      </div>

                      <h3 className="text-sm font-bold text-[#0C1E38] group-hover:text-[#0F52BA] transition-colors">
                        {ind.title}
                      </h3>

                      <p className="mt-1 text-xs text-[#4A5B73] leading-relaxed">
                        {ind.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EDE7DC] flex items-center text-[11px] font-bold text-[#0F52BA] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore solution →</span>
                    </div>
                  </div>
                </Scroll3DCard>
              );
            })}
          </div>

          {/* Interactive Three.js 3D Globe Showcase (globe-andy-greig style) */}
          <div className="rounded-3xl bg-white border border-[#E5DEC9] p-6 sm:p-10 shadow-card flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-left space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F52BA] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                3D Interactive Global Settlement Network
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0C1E38]">
                Instant Settlements Across Global Financial Hubs
              </h3>
              <p className="text-sm text-[#4A5B73] leading-relaxed">
                Interact with the 3D globe to explore real-time settlement corridors between Mumbai, Singapore, Dubai, London, and New York under Toucan&apos;s RBI PA-CB trade inward remittance framework.
              </p>
              <div className="flex items-center gap-6 pt-2 text-xs font-semibold text-[#0C1E38]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0F52BA]" />
                  <span>Direct Bank Nodes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9]" />
                  <span>Real-Time FX Arcs</span>
                </div>
              </div>
            </div>

            {/* Three.js Interactive 3D Canvas Globe (100% Completely Visible & Unclipped) */}
            <div className="shrink-0 flex flex-col items-center justify-center">
              <Interactive3DGlobe size={380} />
              <div className="text-[11px] font-semibold text-[#0F52BA] bg-[#EBF2FC] px-3 py-1 rounded-full border border-[#BFD7F5] mt-1 shadow-subtle flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-ping" />
                <span>Drag globe to explore live settlement corridors</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
