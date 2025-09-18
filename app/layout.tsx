// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
        {/* Simple, non-sticky header with ONLY the logo */}
        <header className="border-b border-slate-800">
          <div className="max-w-5xl mx-auto p-4">
            <Image
              src="/logo.png"
              alt="XzeCure"
              // “Medium” display size; keep aspect ratio from 1080x364
              width={192} // tweak to 224/256 if you want larger
              height={65} // 364/1080 ≈ 0.337 → 192 * 0.337 ≈ 65
              priority
              className="h-12 md:h-14 w-auto" // ensures crisp scaling on different screens
            />
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1">{children}</div>

        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
