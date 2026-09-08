"use client";

import { useEffect } from "react";
import { isLocale, localeLabels, translateText, type Locale } from "./i18n";

function currentLocale(): Locale {
  const segment = window.location.pathname.split("/").filter(Boolean)[0];
  return isLocale(segment) ? segment : "en";
}

export function LocaleBridge() {
  useEffect(() => {
    const locale = currentLocale();
    document.documentElement.lang = locale;
    const pathFor = (next: Locale) => next === "en" ? "/official/ai-video-agent" : `/${next}/official/ai-video-agent`;
    const translateShadow = (root: ShadowRoot) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let node: Node | null;
      while ((node = walker.nextNode())) textNodes.push(node as Text);
      textNodes.forEach((textNode) => {
        const raw = textNode.nodeValue ?? "";
        const trimmed = raw.trim();
        if (!trimmed) return;
        const translated = translateText(locale, trimmed);
        if (translated !== trimmed) textNode.nodeValue = raw.replace(trimmed, translated);
      });
      root.querySelectorAll<HTMLElement>("[aria-label], [title], [placeholder]").forEach((element) => {
        ["aria-label", "title", "placeholder"].forEach((attribute) => {
          const value = element.getAttribute(attribute);
          if (!value) return;
          element.setAttribute(attribute, translateText(locale, value));
        });
      });
    };
    const connect = () => {
      const navbar = document.querySelector("wizstar-navbar") as HTMLElement | null;
      const footer = document.querySelector("wizstar-footer") as HTMLElement | null;
      const shadow = navbar?.shadowRoot;
      const footerShadow = footer?.shadowRoot;
      if (!shadow) return false;
      translateShadow(shadow);
      if (footerShadow) translateShadow(footerShadow);
      const options = [...shadow.querySelectorAll<HTMLButtonElement>(".languageOption")];
      const buttonLabel = shadow.querySelector(".languageButton span");
      if (buttonLabel) buttonLabel.textContent = localeLabels[locale];
      options.forEach((option) => {
        const optionLocale = option.textContent === "ES" ? "es" : option.textContent === "简中" ? "zh-CN" : option.textContent === "繁中" ? "zh-TW" : "en";
        option.classList.toggle("languageOptionActive", optionLocale === locale);
        if (option.dataset.localeWired) return;
        option.dataset.localeWired = "true";
        option.addEventListener("click", () => {
          if (isLocale(optionLocale)) window.location.assign(pathFor(optionLocale));
        });
      });
      return Boolean(footerShadow);
    };
    const timer = window.setInterval(() => { if (connect()) window.clearInterval(timer); }, 50);
    connect();
    return () => window.clearInterval(timer);
  }, []);
  return null;
}
