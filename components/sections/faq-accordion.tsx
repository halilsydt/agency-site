"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQ } from "@/lib/types";

/**
 * Props for the FAQAccordion component.
 */
export interface FAQAccordionProps {
  /** FAQ items to display */
  faqs: FAQ[];
}

/**
 * Displays FAQ items in an accessible accordion.
 * Uses Radix UI Accordion for built-in keyboard navigation and ARIA support.
 *
 * @param props - Component props
 * @param props.faqs - Array of FAQ items to display
 *
 * @example
 * ```tsx
 * <FAQAccordion faqs={allFaqs} />
 * ```
 */
export function FAQAccordion({ faqs }: FAQAccordionProps): React.ReactElement {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto flex max-w-[820px] flex-col gap-[14px]"
    >
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
