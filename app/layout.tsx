import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wizstar.com";
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Seedance 2.5 AI Video Generator — Create 30s Videos with Audio | Wizstar",
  description: "Create Seedance 2.5 videos with audio from text, first and last frames, or up to 50 image, video, and audio references on Wizstar.",
  alternates: { canonical: "/ai-model/seedance-2-5" },
  robots: {
    index: allowIndexing,
    follow: allowIndexing,
    googleBot: { index: allowIndexing, follow: allowIndexing },
  },
  openGraph: {
    type: "website",
    siteName: "Wizstar",
    url: "/ai-model/seedance-2-5",
    title: "Seedance 2.5 AI Video Generator on Wizstar",
    description: "Create up to 30-second Seedance 2.5 videos with audio from text, keyframes, or multimodal references.",
    images: [{ url: "/assets/wizstar-seedance-generator.png", width: 1440, height: 900, alt: "Seedance 2.5 AI Video Generator on Wizstar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seedance 2.5 AI Video Generator on Wizstar",
    description: "Create up to 30-second Seedance 2.5 videos with audio from text, keyframes, or multimodal references.",
    images: ["/assets/wizstar-seedance-generator.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
