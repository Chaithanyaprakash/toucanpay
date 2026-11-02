import React from "react";
import HeroSection from "@/components/hero/HeroSection";
import TrustCredentials from "@/components/sections/TrustCredentials";
import PlatformBento from "@/components/sections/PlatformBento";
import SuperStreamOrchestration from "@/components/sections/SuperStreamOrchestration";
import AnalyticsSection from "@/components/sections/AnalyticsSection";
import BusinessSolutions from "@/components/sections/BusinessSolutions";
import DeveloperExperience from "@/components/sections/DeveloperExperience";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section (Headline, CTA, Capability checks, 3D Connected Platform, Gemini Video) */}
      <HeroSection />

      {/* 2. Trusted Payment Rails and Partners (UPI, Visa, RuPay, Mastercard, NPCI & Category filters) */}
      <TrustCredentials />

      {/* 3. Our Products (Everything you need to move money with confidence - 6 cards) */}
      <PlatformBento />

      {/* 4. Toucan SuperStream (Intelligent orchestration for reliable payments - 3-column orchestrator) */}
      <SuperStreamOrchestration />

      {/* 5. Powerful Dashboards (Real-time visibility across your payments - High-fidelity mockup) */}
      <AnalyticsSection />

      {/* 6. How Payments Flow (4 steps) & Industries We Serve (5 cards) */}
      <BusinessSolutions />

      {/* 7. Developer Experience (Integrate in minutes - Code snippet & feature list) */}
      <DeveloperExperience />

      {/* 8. Frequently Asked Questions (Got questions? We've got answers - 4 clean accordions) */}
      <FaqSection />

      {/* 9. Final Blue CTA Card Banner (Ready to modernize your payment infrastructure?) */}
      <FinalCta />
    </div>
  );
}
