"use client";

import { useLanguage } from "@/components/providers/language-provider";

/**
 * Globe glyph used inside the Atlas language pill.
 * Mirrors the inline SVG from `docs/design system/atlas/i18n.js`.
 */
function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
      className="flex-none opacity-60"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
    </svg>
  );
}

/**
 * Atlas `.lang` globe pill — toggles between English and Turkish locales.
 * Renders a bordered, rounded pill with a globe glyph and an `EN / TR`
 * indicator: the active locale is bold ink, the inactive one is muted.
 * Clicking flips the locale via {@link useLanguage}.
 *
 * @example
 * ```tsx
 * // In header or mobile drawer
 * <LanguageToggle />
 * ```
 */
export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const toggleLocale = () => {
    setLocale(locale === "en" ? "tr" : "en");
  };

  const isEn = locale === "en";

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={isEn ? "Türkçe'ye geç" : "Switch to English"}
      className="inline-flex items-center gap-1.5 rounded-[9px] border border-line px-1.5 py-[5px] font-disp text-[13px] font-semibold text-soft transition-colors hover:border-ink"
    >
      <GlobeIcon />
      <span className={isEn ? "font-bold text-ink" : "text-soft-2"}>EN</span>
      <span aria-hidden="true" className="text-line">
        /
      </span>
      <span className={!isEn ? "font-bold text-ink" : "text-soft-2"}>TR</span>
    </button>
  );
}
