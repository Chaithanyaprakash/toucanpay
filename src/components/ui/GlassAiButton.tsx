"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, ShieldCheck } from "lucide-react";

interface GlassAiButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "royal" | "cream" | "ai" | "outline";
  icon?: "arrow" | "sparkles" | "zap" | "shield" | "none";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
}

export default function GlassAiButton({
  href,
  onClick,
  children,
  variant = "royal",
  icon = "arrow",
  size = "md",
  className = "",
  type = "button",
}: GlassAiButtonProps) {
  const renderIcon = () => {
    switch (icon) {
      case "arrow":
        return <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />;
      case "sparkles":
        return <Sparkles className="w-4 h-4 ml-2 text-cyan-200 animate-pulse" />;
      case "zap":
        return <Zap className="w-4 h-4 ml-2 text-amber-300" />;
      case "shield":
        return <ShieldCheck className="w-4 h-4 ml-2 text-emerald-300" />;
      default:
        return null;
    }
  };

  const getStyleClass = () => {
    let base = "glass-ai-btn group ";
    if (variant === "cream") {
      base = "glass-ai-btn-cream group ";
    } else if (variant === "outline") {
      base = "px-6 py-3.5 rounded-full font-bold text-sm tracking-wide border border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all shadow-sm group ";
    }

    if (size === "sm") {
      base += "!px-4 !py-2 !text-xs ";
    } else if (size === "lg") {
      base += "!px-8 !py-4 !text-base ";
    }

    return base.trim();
  };

  const content = (
    <>
      {variant === "ai" && (
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-200"></span>
        </span>
      )}
      <span>{children}</span>
      {renderIcon()}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${getStyleClass()} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${getStyleClass()} ${className}`}>
      {content}
    </button>
  );
}
