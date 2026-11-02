"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Copy, 
  Check, 
  FileCode2, 
  Boxes, 
  TestTube2, 
  Webhook, 
  BookOpen 
} from "lucide-react";
import GlassAiButton from "@/components/ui/GlassAiButton";
import Scroll3DCard from "@/components/ui/Scroll3DCard";

export default function DeveloperExperience() {
  const [selectedLang, setSelectedLang] = useState<"curl" | "node" | "python" | "java" | "php">("curl");
  const [copied, setCopied] = useState(false);

  const snippets = {
    curl: `curl -X POST https://api.toucanpay.in/v1/payments \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 10000,
    "currency": "INR",
    "customer_id": "cus_123",
    "payment_method": "upi"
  }'`,

    node: `import Toucan from '@toucanpay/sdk';

const toucan = new Toucan({ apiKey: process.env.TOUCAN_API_KEY });

const payment = await toucan.payments.create({
  amount: 10000,
  currency: 'INR',
  customerId: 'cus_123',
  paymentMethod: 'upi',
});

console.log(payment.status);`,

    python: `import toucanpay

client = toucanpay.Client(api_key="YOUR_API_KEY")

payment = client.payments.create(
    amount=10000,
    currency="INR",
    customer_id="cus_123",
    payment_method="upi"
)

print(payment["status"])`,

    java: `import com.toucanpay.ToucanClient;
import com.toucanpay.models.Payment;

ToucanClient client = new ToucanClient("YOUR_API_KEY");

Payment payment = client.payments().create(
    PaymentRequest.builder()
        .amount(10000)
        .currency("INR")
        .customerId("cus_123")
        .paymentMethod("upi")
        .build()
);`,

    php: `<?php
require_once('vendor/autoload.php');

$toucan = new \\Toucan\\Client('YOUR_API_KEY');

$payment = $toucan->payments->create([
    'amount' => 10000,
    'currency' => 'INR',
    'customer_id' => 'cus_123',
    'payment_method' => 'upi'
]);

echo $payment->status;`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[selectedLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    { title: "Comprehensive API reference", icon: FileCode2 },
    { title: "SDKs for popular languages", icon: Boxes },
    { title: "Sandbox environment", icon: TestTube2 },
    { title: "Webhook event delivery", icon: Webhook },
    { title: "Detailed guides and examples", icon: BookOpen },
  ];

  return (
    <section id="developers" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E5DEC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 text-left">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#7D8CA3]">
            DEVELOPER EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0C1E38] tracking-tight mt-2">
            Integrate in minutes
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4A5B73] leading-relaxed">
            Robust APIs, SDKs and webhooks with detailed documentation and test environment.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <GlassAiButton
              href="/dashboard"
              variant="royal"
              icon="arrow"
            >
              View Documentation
            </GlassAiButton>

            <GlassAiButton
              href="/dashboard"
              variant="cream"
              icon="sparkles"
            >
              Try Sandbox
            </GlassAiButton>
          </div>
        </div>

        {/* 2-Column Code Terminal & Features Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left/Center: Code Snippet Card (7 cols) with 3D Tilt */}
          <div className="lg:col-span-7">
            <Scroll3DCard maxTilt={4} perspective={1000} scale={1.01}>
              <div className="rounded-2xl bg-[#09172B] text-slate-200 border border-slate-700/80 shadow-elevated overflow-hidden">
                
                {/* Terminal Tab Bar */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#06101F] border-b border-slate-700/80">
                  <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto text-xs">
                    {(["curl", "node", "python", "java", "php"] as const).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSelectedLang(lang)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-colors ${
                          selectedLang === lang
                            ? "bg-[#0F52BA] text-white shadow-sm"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {lang === "curl" ? "cURL" : lang === "node" ? "Node.js" : lang === "python" ? "Python" : lang === "java" ? "Java" : "PHP"}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-md hover:bg-slate-800 transition-colors shrink-0"
                    title="Copy snippet"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="text-[11px] font-semibold">{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Code Body */}
                <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-cyan-200">
                  <pre className="text-slate-200 whitespace-pre">
                    <code>{snippets[selectedLang]}</code>
                  </pre>
                </div>

              </div>
            </Scroll3DCard>
          </div>

          {/* Right: Checklist Features List (5 cols) */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E5DEC9] shadow-subtle hover:border-[#0F52BA] hover:shadow-card transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0F52BA] border border-blue-100 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-[#0C1E38]">
                    {feat.title}
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
