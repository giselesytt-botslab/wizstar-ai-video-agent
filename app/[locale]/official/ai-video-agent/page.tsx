import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Home from "../../../page";
import { isLocale, locales, translations, type Locale } from "../../../i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "en";
  const copy = translations[locale];
  return {
    title: `${copy.heroTitle} | Wizstar`,
    description: copy.heroDescription,
    alternates: {
      canonical: `/${locale}/official/ai-video-agent`,
      languages: {
        en: "/official/ai-video-agent",
        es: "/es/official/ai-video-agent",
        "zh-CN": "/zh-CN/official/ai-video-agent",
        "zh-TW": "/zh-TW/official/ai-video-agent",
      },
    },
  };
}

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  return <Home locale={rawLocale as Locale} />;
}
