"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Atlas `.bundle` highlight bar (atlas.css:254–257). A green-soft bar with the
 * bundle title + description (in `green-d`) on the left and an ink "Get Bundle
 * Quote" button (→ `/contact`) on the right, collapsing to a column at 820px.
 * Mirrors the homepage `pricing-preview.tsx` bundle bar. All copy is i18n-driven.
 *
 * @example
 * ```tsx
 * <BundleHighlight />
 * ```
 */
export function BundleHighlight(): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  return (
    <div className="wrap">
      <Reveal
        as="div"
        className="mx-auto mt-[34px] flex max-w-[880px] items-center justify-between gap-5 rounded-[20px] border border-[#CBE5D6] bg-green-soft px-8 py-6 max-[820px]:flex-col max-[820px]:items-start"
      >
        <div>
          <h4 className="font-disp text-[20px] font-bold text-green-d">
            {t.bundle.title}
          </h4>
          <p className="text-[14.5px] text-green-d opacity-80">
            {t.bundle.description}
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[12px] border-[1.5px] border-transparent bg-ink px-6 py-[14px] font-disp text-[15px] font-semibold text-white no-underline transition-all duration-200 [transition-timing-function:cubic-bezier(.2,.7,.3,1)] hover:-translate-y-0.5 hover:bg-ink-2 hover:text-white hover:no-underline"
        >
          {t.bundle.cta}
        </Link>
      </Reveal>
    </div>
  );
}
