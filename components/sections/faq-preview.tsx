"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Represents a single FAQ item.
 */
export interface FAQItem {
  /** Unique identifier for the FAQ item */
  id: string;
  /** The question text */
  question: string;
  /** The answer text */
  answer: string;
}

/**
 * Props for the FAQPreviewSection component.
 */
export interface FAQPreviewSectionProps {
  /** Section headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
}

/**
 * Displays a preview of frequently asked questions on the homepage.
 * Features an accessible accordion for expandable Q&A and a link to the full FAQ page.
 * Supports internationalization through the language context.
 *
 * @param props - Component props
 * @param props.headline - Section headline text
 * @param props.subheadline - Optional subheadline text
 *
 * @example
 * ```tsx
 * <FAQPreviewSection headline="Common Questions" />
 *
 * <FAQPreviewSection
 *   headline="FAQs"
 *   subheadline="Quick answers to help you decide"
 * />
 * ```
 */
export function FAQPreviewSection({
  headline,
  subheadline,
}: FAQPreviewSectionProps): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  const faqItems: FAQItem[] = [
    {
      id: "faq-1",
      question: t.faqPreview.q1,
      answer: t.faqPreview.a1,
    },
    {
      id: "faq-2",
      question: t.faqPreview.q2,
      answer: t.faqPreview.a2,
    },
    {
      id: "faq-3",
      question: t.faqPreview.q3,
      answer: t.faqPreview.a3,
    },
    {
      id: "faq-4",
      question: t.faqPreview.q4,
      answer: t.faqPreview.a4,
    },
    {
      id: "faq-5",
      question: t.faqPreview.q5,
      answer: t.faqPreview.a5,
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{headline}</h2>
          {subheadline && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subheadline}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link href="/faq">{t.faqPreview.viewAllFaqs}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
