import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { LocaleBridge } from "./locale-bridge";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wizstar.com";
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AI Video Agent for Complete Video Creation | Wizstar",
  description: "Wizstar AI Video Agent turns ideas, briefs, products, scripts, and references into complete video workflows with scenes, voice, edits, and publish-ready outputs. Start in Wizstar.",
  alternates: {
    canonical: "/official/ai-video-agent",
    languages: {
      en: "/official/ai-video-agent",
      es: "/es/official/ai-video-agent",
      "zh-CN": "/zh-CN/official/ai-video-agent",
      "zh-TW": "/zh-TW/official/ai-video-agent",
    },
  },
  robots: {
    index: allowIndexing,
    follow: allowIndexing,
    googleBot: { index: allowIndexing, follow: allowIndexing },
  },
  openGraph: {
    type: "website",
    siteName: "Wizstar",
    url: "/official/ai-video-agent",
    title: "AI Video Agent for Complete Video Creation | Wizstar",
    description: "Turn one brief into a finished video workflow with Wizstar AI Video Agent.",
    images: [{ url: "/assets/wizstar-seedance-generator.png", width: 1440, height: 900, alt: "Wizstar AI Video Agent workspace" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Video Agent for Complete Video Creation | Wizstar",
    description: "Turn one brief into a finished video workflow with Wizstar AI Video Agent.",
    images: ["/assets/wizstar-seedance-generator.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}><script src="/wizstar-shell.js"></script><LocaleBridge />{children}</body></html>;
}
