"use client";

import React, { useEffect, useState } from "react";
interface QrCodeGeneratorProps {
  value: string;
  size?: number;
  className?: string;
  logoSrc?: string;
}

export default function QrCodeGenerator({
  value,
  size = 180,
  className = "",
  logoSrc = "/brand/logo.svg",
}: QrCodeGeneratorProps) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    let isMounted = true;
    import("qrcode")
      .then((QRCodeModule) => {
        const QRCode = QRCodeModule.default || QRCodeModule;
        return QRCode.toDataURL(value, {
          width: size * 2,
          margin: 1,
          color: {
            dark: "#172033",
            light: "#FFFFFF",
          },
          errorCorrectionLevel: "H",
        });
      })
      .then((url) => {
        if (isMounted) setDataUrl(url);
      })
      .catch((err) => console.error("QR Code Generation Error:", err));

    return () => {
      isMounted = false;
    };
  }, [value, size]);

  return (
    <div
      className={`relative flex items-center justify-center p-3 bg-white rounded-2xl border border-line shadow-subtle ${className}`}
      style={{ width: size + 24, height: size + 24 }}
    >
      {dataUrl ? (
        <img
          src={dataUrl}
          alt={`QR Code: ${value}`}
          className="rounded-xl w-full h-full object-contain"
          width={size}
          height={size}
        />
      ) : (
        <div
          className="w-full h-full bg-surface-subtle animate-pulse rounded-xl flex items-center justify-center"
        >
          <span className="text-[10px] text-ink-tertiary font-mono">Generating QR...</span>
        </div>
      )}

      {/* Central Branding Badge for UPI / Toucan */}
      {dataUrl && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-lg bg-white border border-line shadow-card flex items-center justify-center p-1">
            <span className="text-[9px] font-extrabold text-[#136FC6] font-mono tracking-tighter">
              PAY
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
