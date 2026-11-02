import type { Metadata } from "next";
import "./globals.css";
import NavigationWrapper from "@/components/navigation/NavigationWrapper";

export const metadata: Metadata = {
  title: "Toucan Payments | RBI-Authorized Enterprise Payment Infrastructure",
  description: "Unified payment infrastructure, SuperStream AI routing orchestration, domestic payment acceptance (AcquireFlow), BBPS bill collections, and cross-border PA-CB trade settlements.",
  icons: {
    icon: "/brand/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-ink-primary font-sans antialiased flex flex-col selection:bg-brand-blue/15 selection:text-brand-blue">
        <NavigationWrapper>{children}</NavigationWrapper>
      </body>
    </html>
  );
}
