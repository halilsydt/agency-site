import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  /** Array of FAQ items to display (defaults to common questions) */
  faqItems?: FAQItem[];
}

/**
 * Default FAQ items covering common questions about the agency services.
 */
const defaultFAQItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "What platforms do you support?",
    answer:
      "We specialize in Amazon and Etsy marketplace consulting. Whether you're selling on one platform or both, we can help optimize your presence and grow your sales.",
  },
  {
    id: "faq-2",
    question: "How does the consultation process work?",
    answer:
      "We start with a free discovery call to understand your business and goals. From there, we create a custom strategy tailored to your specific needs and provide ongoing support throughout implementation.",
  },
  {
    id: "faq-3",
    question: "Are there any hidden fees?",
    answer:
      "No hidden fees, ever. We believe in transparent pricing. What you see on our pricing page is what you pay. We'll always discuss any costs upfront before starting work.",
  },
  {
    id: "faq-4",
    question: "How long before I see results?",
    answer:
      "Results vary depending on your starting point and goals, but most clients see measurable improvements within 30-60 days. We focus on sustainable growth, not quick fixes.",
  },
  {
    id: "faq-5",
    question: "Do you offer refunds or guarantees?",
    answer:
      "We stand behind our work. While marketplace success depends on many factors, we offer a satisfaction guarantee on our consulting services. If you're not happy with our recommendations, we'll work with you to make it right.",
  },
];

/**
 * Displays a preview of frequently asked questions on the homepage.
 * Features an accessible accordion for expandable Q&A and a link to the full FAQ page.
 *
 * @param props - Component props
 * @param props.headline - Section headline text
 * @param props.subheadline - Optional subheadline text
 * @param props.faqItems - Optional custom FAQ items (defaults to common questions)
 *
 * @example
 * ```tsx
 * <FAQPreviewSection headline="Common Questions" />
 *
 * <FAQPreviewSection
 *   headline="FAQs"
 *   subheadline="Quick answers to help you decide"
 *   faqItems={customFAQs}
 * />
 * ```
 */
export function FAQPreviewSection({
  headline,
  subheadline,
  faqItems = defaultFAQItems,
}: FAQPreviewSectionProps): React.ReactElement {
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
            <Link href="/faq">View All FAQs</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
