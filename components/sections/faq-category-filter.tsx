"use client";

import type { FAQCategory } from "@/lib/types";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Category option including "all" for showing all FAQs.
 */
export type CategoryOption = FAQCategory | "all";

/**
 * Props for the FAQCategoryFilter component.
 */
export interface FAQCategoryFilterProps {
  /** Currently active category filter */
  activeCategory: CategoryOption;
  /** Callback when category changes */
  onCategoryChange: (category: CategoryOption) => void;
}

/**
 * Atlas `.faq-cats` filter row (atlas.css:301–304). A centered, wrapping row of
 * bespoke `.faq-cat` pill buttons. The active pill uses the Atlas **ink** look
 * (`bg-ink text-white`), inactive pills use the surface/line look. Rendered as
 * native `<button>`s (not the green `Button` primitive) to match the ink active
 * state, with `aria-pressed` + a focus-visible ring for keyboard a11y.
 *
 * @param props - Component props
 * @param props.activeCategory - Currently selected category
 * @param props.onCategoryChange - Handler for category selection
 *
 * @example
 * ```tsx
 * <FAQCategoryFilter
 *   activeCategory="all"
 *   onCategoryChange={(cat) => setActiveCategory(cat)}
 * />
 * ```
 */
export function FAQCategoryFilter({
  activeCategory,
  onCategoryChange,
}: FAQCategoryFilterProps): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  const categories: CategoryOption[] = [
    "all",
    "general",
    "amazon",
    "etsy",
    "pricing",
  ];

  return (
    <div className="mb-[34px] flex flex-wrap justify-center gap-[10px]">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onCategoryChange(category)}
            className={`cursor-pointer rounded-full border px-5 py-[10px] font-disp text-sm font-semibold transition-[.18s] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 ${
              isActive
                ? "border-ink bg-ink text-white"
                : "border-line bg-surface text-soft hover:border-ink"
            }`}
          >
            {t.faqCategories[category]}
          </button>
        );
      })}
    </div>
  );
}
