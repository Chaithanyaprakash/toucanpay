"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Building2, 
  FileText, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  UploadCloud, 
  ShieldCheck, 
  Key, 
  Sparkles,
  Check
} from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState<number>(1);
  const [businessName, setBusinessName] = useState("Acme Global Technologies Pvt Ltd");
  const [gstin, setGstin] = useState("29ABCDE1234F1Z5");
  const [pan, setPan] = useState("ABCDE1234F");
  const [entityType, setEntityType] = useState("Private Limited");
  const [website, setWebsite] = useState("https://acmeglobal.io");
  const [bankAccount, setBankAccount] = useState("91802004819201");
  const [ifsc, setIfsc] = useState("HDFC0001234");
  const [pennyDropStatus, setPennyDropStatus] = useState<"unverified" | "verifying" | "verified">("unverified");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(["Certificate_of_Incorporation.pdf", "Board_Resolution_Pan.pdf"]);

  const triggerPennyDrop = () => {
    setPennyDropStatus("verifying");
    setTimeout(() => {
      setPennyDropStatus("verified");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-surface-subtle py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-brand-blue">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Toucan Homepage</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-brand-blue">
            <ShieldCheck className="w-4 h-4" />
            <span>RBI PA-CB Regulatory Verification Flow</span>
          </div>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="bg-white p-6 rounded-3xl border border-line shadow-subtle">
          <div className="grid grid-cols-4 gap-2">
            {[
              { num: 1, label: "Business Details", icon: Building2 },
              { num: 2, label: "KYC Documents", icon: FileText },
              { num: 3, label: "Bank Settlement", icon: CreditCard },
              { num: 4, label: "Live Activation", icon: Key },
            ].map((s) => {
              const Icon = s.icon;
              const isDone = step > s.num;
              const isCurrent = step === s.num;
              return (
                <div key={s.num} className="flex flex-col items-center text-center">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                      isDone
                        ? "bg-brand-success text-white"
                        : isCurrent
                        ? "bg-brand-blue text-white shadow-subtle"
                        : "bg-surface-subtle text-ink-tertiary border border-line"
                    }`}
                  >
                    {isDone ? <Check className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`text-[11px] font-semibold ${isCurrent ? "text-brand-blue" : "text-ink-secondary"}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP CONTENT BOX */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-line shadow-card space-y-6">
          
          {/* STEP 1: BUSINESS PROFILE */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">Step 1 of 4</span>
                <h2 className="text-2xl font-bold text-ink-primary mt-1">Business Profile & Verification</h2>
                <p className="text-xs text-ink-secondary mt-1">
                  Required under Reserve Bank of India Master Directions on Payment Aggregators.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-ink-primary mb-1">Registered Legal Entity Name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-primary mb-1">Company PAN</label>
                  <input
                    type="text"
                    value={pan}
                    onChange={(e) => setPan(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-primary mb-1">GSTIN</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-primary mb-1">Constitution / Entity Type</label>
                  <select
                    value={entityType}
                    onChange={(e) => setEntityType(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue"
                  >
                    <option>Private Limited</option>
                    <option>Public Limited</option>
                    <option>LLP (Limited Liability Partnership)</option>
                    <option>Sole Proprietorship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-primary mb-1">Operating Website / App URL</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-xl shadow-subtle flex items-center gap-2"
                >
                  <span>Continue to KYC Upload</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: KYC DOCUMENT UPLOADS */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">Step 2 of 4</span>
                <h2 className="text-2xl font-bold text-ink-primary mt-1">KYC & Compliance Documents</h2>
                <p className="text-xs text-ink-secondary mt-1">
                  Upload PDF or JPEG copies of official incorporation files for automatic OCR verification.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-brand-blue/40 rounded-2xl p-8 text-center bg-brand-blue/5 hover:bg-brand-blue/10 transition-colors cursor-pointer">
                <UploadCloud className="w-10 h-10 text-brand-blue mx-auto mb-2" />
                <p className="text-xs font-bold text-ink-primary">Click or Drag & Drop Documents Here</p>
                <p className="text-[11px] text-ink-secondary mt-1">
                  Supports Certificate of Incorporation, Director PAN, MOA/AOA, and GST Certificate (Max 15MB each)
                </p>
              </div>

              {/* Uploaded Documents List */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-ink-primary">Verified Uploads (2 files attached):</p>
                {uploadedFiles.map((f, i) => (
                  <div key={i} className="p-3 bg-surface-subtle rounded-xl border border-line flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-blue" />
                      <span className="font-mono text-ink-primary">{f}</span>
                    </div>
                    <span className="text-brand-success font-semibold flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>OCR Verified</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-xs font-semibold text-ink-secondary hover:text-ink-primary"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-xl shadow-subtle flex items-center gap-2"
                >
                  <span>Continue to Settlement Bank</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: BANK ACCOUNT & PENNY DROP */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">Step 3 of 4</span>
                <h2 className="text-2xl font-bold text-ink-primary mt-1">Settlement Bank Account Verification</h2>
                <p className="text-xs text-ink-secondary mt-1">
                  Where daily merchant payouts and net receivables will be credited via direct RTGS/NEFT.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-ink-primary mb-1">Current Bank Account Number</label>
                  <input
                    type="text"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-primary mb-1">Bank IFSC Code</label>
                  <input
                    type="text"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-primary mb-1">Beneficiary Name Matching</label>
                  <input
                    type="text"
                    disabled
                    value={businessName}
                    className="w-full px-3.5 py-2.5 text-xs bg-surface-subtle border border-line rounded-xl text-ink-secondary"
                  />
                </div>
              </div>

              {/* Penny-drop Trigger Box */}
              <div className="p-4 rounded-2xl bg-surface-subtle border border-line flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-ink-primary">Instant Bank Penny-Drop Check</p>
                  <p className="text-[11px] text-ink-secondary">
                    {pennyDropStatus === "verified"
                      ? "₹1.00 credit confirmed. Account name matches incorporation legal entity."
                      : "Verifies account validity with NPCI before live activation."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={triggerPennyDrop}
                  disabled={pennyDropStatus === "verified" || pennyDropStatus === "verifying"}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                    pennyDropStatus === "verified"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-brand-blue text-white hover:bg-brand-blue/90"
                  }`}
                >
                  {pennyDropStatus === "verifying"
                    ? "Depositing ₹1..."
                    : pennyDropStatus === "verified"
                    ? "✓ Verified"
                    : "Verify Account"}
                </button>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-xs font-semibold text-ink-secondary hover:text-ink-primary"
                >
                  &larr; Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-xl shadow-subtle flex items-center gap-2"
                >
                  <span>Activate Sandbox & Production</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ACTIVATION & CREDENTIAL PROVISIONING */}
          {step === 4 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-blue flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-success">
                  Application Submitted Successfully
                </span>
                <h2 className="text-2xl font-bold text-ink-primary mt-1">
                  Welcome to Toucan Payments!
                </h2>
                <p className="text-xs text-ink-secondary max-w-md mx-auto mt-2">
                  Your sandbox credentials are ready for integration. Our compliance team will review your PA-CB documentation within 24 business hours.
                </p>
              </div>

              {/* Generated API Keys Preview */}
              <div className="bg-surface-subtle p-5 rounded-2xl border border-line max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink-primary">Live Merchant ID:</span>
                  <span className="font-mono text-ink-primary font-bold">mcht_live_acme904</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink-primary">Test API Key:</span>
                  <span className="font-mono text-brand-blue font-bold">key_test_90841209acme</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink-primary">SuperStream Engine:</span>
                  <span className="font-semibold text-brand-success">Active & Routing</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto px-6 py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold text-xs rounded-xl shadow-subtle flex items-center justify-center gap-2"
                >
                  <span>Launch Merchant Console</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/checkout"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white border border-line hover:bg-surface-subtle text-ink-primary font-semibold text-xs rounded-xl shadow-subtle"
                >
                  Test Payment Gateway
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
