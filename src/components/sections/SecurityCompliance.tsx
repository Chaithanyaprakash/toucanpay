import React from "react";
import { ShieldCheck, Lock, Database, FileCheck, CheckCircle2 } from "lucide-react";

export default function SecurityCompliance() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
            Governance & Compliance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-primary mt-2">
            Bank-Grade Security. Rigorous Regulatory Governance.
          </h2>
          <p className="mt-3 text-base text-ink-secondary">
            Payment security isn&apos;t an afterthought. Every layer of ToucanOS is designed to satisfy the strictest regulatory standards set by the Reserve Bank of India and global payment security councils.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-surface-subtle p-7 rounded-3xl border border-line shadow-subtle hover:border-brand-blue/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-line flex items-center justify-center text-brand-blue mb-5 shadow-subtle">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink-primary">PCI DSS Level 1 v4.0</h3>
              <p className="text-xs text-ink-secondary mt-2 leading-relaxed">
                Certified under the highest global standard for payment card security. Annual audits by independent Qualified Security Assessors (QSA).
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line text-[11px] font-mono text-brand-blue font-semibold">
              Zero Card Data Exposure
            </div>
          </div>

          <div className="bg-surface-subtle p-7 rounded-3xl border border-line shadow-subtle hover:border-brand-blue/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-line flex items-center justify-center text-brand-cyan mb-5 shadow-subtle">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink-primary">Card-on-File Tokenization</h3>
              <p className="text-xs text-ink-secondary mt-2 leading-relaxed">
                Complies with RBI mandates. Customer card numbers are substituted with encrypted tokens issued directly by Visa, Mastercard, and RuPay.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line text-[11px] font-mono text-brand-cyan font-semibold">
              Hardware Security Modules (HSM)
            </div>
          </div>

          <div className="bg-surface-subtle p-7 rounded-3xl border border-line shadow-subtle hover:border-brand-blue/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-line flex items-center justify-center text-brand-navy mb-5 shadow-subtle">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink-primary">Strict Data Localization</h3>
              <p className="text-xs text-ink-secondary mt-2 leading-relaxed">
                All end-to-end transaction data, customer identities, and settlement records are stored exclusively within Indian sovereign data centers.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line text-[11px] font-mono text-brand-navy font-semibold">
              100% RBI Sovereign Storage
            </div>
          </div>

          <div className="bg-surface-subtle p-7 rounded-3xl border border-line shadow-subtle hover:border-brand-blue/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white border border-line flex items-center justify-center text-brand-success mb-5 shadow-subtle">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-ink-primary">ISO 27001 & SOC 2</h3>
              <p className="text-xs text-ink-secondary mt-2 leading-relaxed">
                Comprehensive Information Security Management System covering continuous vulnerability scanning, intrusion prevention, and access controls.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-line text-[11px] font-mono text-brand-success font-semibold">
              Continuous Audited Controls
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
