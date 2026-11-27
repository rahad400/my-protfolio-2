import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import ScrollToTop from "@/components/shared/ScrollToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rahad —  Full-Stack Developer",
  description:
    "Portfolio of Rahad,  Full-Stack Developer building modern web applications with React, Next.js, TypeScript, and Node.js.",
  openGraph: {
    title: "Rahad — Junior Full-Stack Developer",
    description:
      "Portfolio of Rahad,  Full-Stack Developer building modern web applications with React, Next.js, TypeScript, and Node.js.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahad — Junior Full-Stack Developer",
    description:
      "Portfolio of Rahad, a Junior Full-Stack Developer building modern web applications with React, Next.js, TypeScript, and Node.js.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground">
        <ScrollToTop />
        <AnimatedBackground />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
