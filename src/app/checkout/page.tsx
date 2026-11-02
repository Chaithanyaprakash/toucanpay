"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  CreditCard, 
  Building2, 
  Smartphone, 
  RefreshCw, 
  ChevronRight, 
  Copy,
  Receipt,
  Download
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import QrCodeGenerator from "@/components/ui/QrCodeGenerator";

export default function CheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const [upiId, setUpiId] = useState("merchant@okaxis");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8912");
  const [cardExpiry, setCardExpiry] = useState("08/29");
  const [cardCvv, setCardCvv] = useState("•••");
  const [cardName, setCardName] = useState("Chaitanya V");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [timeLeft, setTimeLeft] = useState(480); // 8 minutes countdown

  // Timer simulation
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentState("processing");
    
    // Simulate deterministic payment lifecycle
    setTimeout(() => {
      setPaymentState("success");
    }, 2200);
  };

  const resetCheckout = () => {
    setPaymentState("idle");
  };

  return (
    <div className="min-h-screen bg-surface-subtle py-8 lg:py-14 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-line shadow-card overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-white px-6 py-4 border-b border-line flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-brand-blue">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Toucan Homepage</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-brand-blue font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
        </div>

        {/* SUCCESS STATE */}
        {paymentState === "success" && (
          <div className="p-8 sm:p-14 text-center max-w-lg mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-brand-success flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-success">
                Payment Authorized & Captured
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink-primary mt-1">
                ₹ 14,850.00
              </h2>
              <p className="text-xs text-ink-secondary mt-1">
                Transaction ID: <span className="font-mono font-bold text-ink-primary">pay_live_08912401</span>
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-surface-subtle p-5 rounded-2xl border border-line text-left text-xs space-y-2.5">
              <div className="flex justify-between text-ink-secondary">
                <span>Merchant</span>
                <span className="font-semibold text-ink-primary">Toucan Payments Enterprise</span>
              </div>
              <div className="flex justify-between text-ink-secondary">
                <span>Payment Rail</span>
                <span className="font-semibold text-ink-primary">
                  {selectedMethod === "upi" ? "UPI QR (NPCI Direct)" : selectedMethod === "card" ? "Visa Card (Tokenized)" : selectedBank}
                </span>
              </div>
              <div className="flex justify-between text-ink-secondary">
                <span>Bank Reference (RRN)</span>
                <span className="font-mono text-ink-primary">629910482910</span>
              </div>
              <div className="flex justify-between text-ink-secondary">
                <span>Settlement Status</span>
                <span className="font-semibold text-brand-success">Cleared for T+1 Disbursal</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={resetCheckout}
                className="w-full sm:w-auto px-5 py-2.5 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-xl text-xs font-semibold shadow-subtle"
              >
                Simulate Another Transaction
              </button>
              <Link
                href="/dashboard/transactions"
                className="w-full sm:w-auto px-5 py-2.5 bg-white border border-line hover:bg-surface-subtle text-ink-primary rounded-xl text-xs font-semibold"
              >
                View in Merchant Ledger
              </Link>
            </div>
          </div>
        )}

        {/* PROCESSING STATE */}
        {paymentState === "processing" && (
          <div className="p-12 sm:p-20 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mx-auto text-brand-blue">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink-primary">Orchestrating Payment...</h3>
              <p className="text-xs text-ink-secondary mt-1">
                SuperStream is connecting to banking switches and verifying authorization token.
              </p>
            </div>
            <div className="p-3 bg-surface-subtle rounded-xl border border-line text-[11px] font-mono text-ink-secondary">
              Do not refresh or close this browser window.
            </div>
          </div>
        )}

        {/* IDLE STATE: INTERACTIVE CHECKOUT EXPERIENCE */}
        {paymentState === "idle" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-line">
            
            {/* Left Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-surface-subtle/50 space-y-6">
              <div className="flex items-center gap-3">
                <img src="/brand/logo.svg" alt="Toucan" className="h-5 object-contain" />
                <span className="text-xs font-bold text-ink-primary">Merchant Order #ORD-202610</span>
              </div>

              <div>
                <span className="text-xs font-semibold text-ink-secondary uppercase tracking-wider">Amount Due</span>
                <p className="text-3xl font-extrabold font-heading text-ink-primary mt-1">
                  ₹ 14,850.00
                </p>
                <div className="flex items-center gap-2 mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg w-fit">
                  <span>Session Expires in:</span>
                  <span className="font-mono font-bold">
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </span>
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-3 pt-4 border-t border-line text-xs">
                <div className="flex justify-between text-ink-primary">
                  <span>AcquireFlow Enterprise SaaS (1 Year)</span>
                  <span className="font-semibold">₹ 12,500.00</span>
                </div>
                <div className="flex justify-between text-ink-secondary">
                  <span>Cross-Border Settlement Module</span>
                  <span className="font-semibold">₹ 1,500.00</span>
                </div>
                <div className="flex justify-between text-ink-secondary">
                  <span>Integrated GST (18%)</span>
                  <span className="font-semibold">₹ 850.00</span>
                </div>
              </div>

              <div className="pt-4 border-t border-line space-y-2 text-xs text-ink-secondary">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-success" />
                  <span>Verified RBI PA-CB Infrastructure</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-brand-blue" />
                  <span>PCI-DSS Level 1 Tokenized Processing</span>
                </div>
              </div>
            </div>

            {/* Right Column: Payment Form & Method Switcher (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              
              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod("upi")}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedMethod === "upi"
                      ? "bg-brand-blue/5 border-brand-blue text-brand-blue shadow-subtle font-semibold"
                      : "bg-white border-line text-ink-secondary hover:bg-surface-subtle"
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-brand-cyan" />
                  <span className="text-xs block">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod("card")}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedMethod === "card"
                      ? "bg-brand-blue/5 border-brand-blue text-brand-blue shadow-subtle font-semibold"
                      : "bg-white border-line text-ink-secondary hover:bg-surface-subtle"
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-brand-blue" />
                  <span className="text-xs block">Cards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod("netbanking")}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedMethod === "netbanking"
                      ? "bg-brand-blue/5 border-brand-blue text-brand-blue shadow-subtle font-semibold"
                      : "bg-white border-line text-ink-secondary hover:bg-surface-subtle"
                  }`}
                >
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-brand-navy" />
                  <span className="text-xs block">Netbanking</span>
                </button>
              </div>

              {/* METHOD 1: UPI & QR CODE */}
              {selectedMethod === "upi" && (
                <div className="space-y-5">
                  <div className="bg-surface-subtle p-5 rounded-2xl border border-line text-center space-y-3">
                    <p className="text-xs font-bold text-ink-primary">Scan QR with any UPI App</p>
                    
                    {/* Real Authentic Generated UPI QR Code */}
                    <div className="flex justify-center my-2">
                      <QrCodeGenerator
                        value="upi://pay?pa=toucanpay@yesbank&pn=ToucanPayments&am=14850.00&cu=INR&tn=Order_ORD202610"
                        size={150}
                      />
                    </div>

                    <p className="text-[11px] text-ink-secondary">
                      Supports Google Pay, PhonePe, Paytm, CRED, BHIM & all bank UPI apps
                    </p>
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="border-t border-line w-full" />
                    <span className="bg-white px-3 text-[10px] text-ink-tertiary uppercase font-mono absolute">
                      OR ENTER UPI ID
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-primary mb-1">
                      Virtual Payment Address (VPA / UPI ID)
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. mobile@upi"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handlePay}
                    className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl shadow-subtle transition-all flex items-center justify-center gap-2"
                  >
                    <span>Pay ₹ 14,850.00 via UPI</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* METHOD 2: CARDS */}
              {selectedMethod === "card" && (
                <form onSubmit={handlePay} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink-primary mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue font-mono"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-80">
                        <img src="/brand/visa.svg" alt="Visa" className="h-3.5 object-contain" />
                        <img src="/brand/master-card.svg" alt="Mastercard" className="h-3.5 object-contain" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-ink-primary mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM / YY"
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-primary mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={4}
                        placeholder="•••"
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-primary mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Name on card"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-line rounded-xl text-ink-primary focus:outline-none focus:border-brand-blue"
                    />
                  </div>

                  <div className="p-3 bg-surface-subtle rounded-xl border border-line text-[11px] text-ink-secondary flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-success shrink-0" />
                    <span>Card will be tokenized per RBI guidelines without storing sensitive data.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl shadow-subtle transition-all flex items-center justify-center gap-2"
                  >
                    <span>Pay ₹ 14,850.00 via Card</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* METHOD 3: NETBANKING */}
              {selectedMethod === "netbanking" && (
                <div className="space-y-4">
                  <p className="text-xs font-bold text-ink-primary">Select Your Bank</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra", "Yes Bank"].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                          selectedBank === bank
                            ? "bg-brand-blue/5 border-brand-blue text-brand-blue font-bold shadow-subtle"
                            : "bg-white border-line text-ink-primary hover:bg-surface-subtle"
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handlePay}
                    className="w-full py-3.5 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold text-xs rounded-xl shadow-subtle transition-all flex items-center justify-center gap-2 mt-4"
                  >
                    <span>Proceed to {selectedBank} Netbanking</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
