import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "XSTREAM IPTV | #1 Premium IPTV Subscription 2026",
  description: "Experience buffer-free 4K IPTV. Expert reviews, setup guides, and the best UK & USA subscription deals for 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-[#fcfcfd] text-slate-900 font-sans">
        {/* Advanced Glassmorphism Header */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/70 backdrop-blur-xl">
          <div className="container mx-auto max-w-6xl px-6 flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
                <span className="text-white font-black text-xl">X</span>
              </div>
              <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
                XSTREAM<span className="text-blue-600">IPTV</span>
              </span>
            </Link>
            
            <nav className="flex items-center gap-6">
              <a 
                href="https://api.whatsapp.com/send?phone=447871743874&text=I%20WANT%20MY%20TRIAL%20BEFORE%20PURCHASE%20%F0%9F%98%80"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex relative group px-6 py-3 font-bold text-white transition-all rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-[0_10px_20px_-10px_rgba(34,197,94,0.5)] hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.6)] hover:-translate-y-0.5 active:scale-95"
              >
                Start Free Trial ⚡️
              </a>
            </nav>
          </div>
        </header>

        <div className="flex-1">
          {children}
        </div>

        {/* Premium Footer */}
        <footer className="mt-20 border-t border-slate-200 bg-white py-16">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                   <span className="text-xl font-black tracking-tighter">XSTREAM<span className="text-blue-600">IPTV</span></span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                  The world&apos;s leading authority on high-performance IPTV subscriptions and 4K streaming technology.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Our Storefronts</h4>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <a href="https://xstreamiptv.co.uk/" className="hover:text-blue-600 transition-colors">Xstream IPTV UK</a>
                  <a href="https://goodiptvhub.com/" className="hover:text-blue-600 transition-colors">Good IPTV Hub</a>
                  <a href="https://iptvmembership.store/" className="hover:text-blue-600 transition-colors">4K Membership Store</a>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Support</h4>
                <div className="flex flex-col gap-2 text-sm text-slate-500">
                  <a href="https://api.whatsapp.com/send?phone=447871743874" className="hover:text-green-600 transition-colors">Contact Expert via WhatsApp</a>
                  <span>24/7 Server Monitoring</span>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400 uppercase tracking-widest">
              <p>© 2026 XSTREAM IPTV UK. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-8">
                <a href="/privacy-policy" className="hover:text-slate-900 hover:underline">Privacy</a>
                <a href="/terms" className="hover:text-slate-900 hover:underline">Terms</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
