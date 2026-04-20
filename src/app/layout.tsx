import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IPTV Blog | Best IPTV Subscription 2026",
  description: "Expert reviews, setup guides, and best subscription deals for IPTV in 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
              XSTREAM<span className="text-gray-900">IPTV</span>
            </Link>
            
            <nav className="flex items-center gap-4">
              <a 
                href="https://api.whatsapp.com/send?phone=447871743874&text=I%20WANT%20MY%20TRIAL%20BEFORE%20PURCHASE%20%F0%9F%98%80"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-green-600 transition-all hover:scale-105"
              >
                START THE TRIAL 🚀
              </a>
            </nav>
          </div>
        </header>

        <div className="flex-1">
          {children}
        </div>

        <footer className="border-t py-10 bg-gray-50">
          <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© 2026 XSTREAM IPTV UK. All rights reserved.</p>
            <div className="mt-4 flex justify-center gap-6">
              <a href="https://xstreamiptv.co.uk/" className="hover:text-blue-600">XSTREAM IPTV</a>
              <a href="https://goodiptvhub.com/" className="hover:text-blue-600">GOOD IPTV HUB</a>
              <a href="https://iptvmembership.store/" className="hover:text-blue-600">4K IPTV MEMBERSHIP</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
