import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import Marquee from "../components/Marquee";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MSL Conseils - Odoo Finance",
  description: "Expert Odoo Finance Belgique & Maroc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SmoothScroll>
          {/* TopBar en premier pour qu'elle soit en haut */}
          <Marquee />
          {/* Header juste après la TopBar */}
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
