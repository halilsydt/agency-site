"use client";

import { Button } from "@/components/ui/button";
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
 * Filter buttons for FAQ categories.
 * Allows users to filter FAQs by category.
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
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
        >
          {t.faqCategories[category]}
        </Button>
      ))}
    </div>
  );
}
