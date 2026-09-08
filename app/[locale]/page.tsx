import { notFound, redirect } from "next/navigation";
import { isLocale } from "../i18n";

export default async function LocalizedRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  redirect(`/${rawLocale}/official/ai-video-agent`);
}
