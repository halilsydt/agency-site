"use client";

import Link from "next/link";
import { Gift } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Bundle discount highlight section for the pricing page.
 * Prominently displays the bundle discount offer with a CTA.
 * Supports internationalization through the language context.
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
    <section className="py-12 bg-accent/10">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-accent/20 rounded-full">
              <Gift className="h-8 w-8 text-accent" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {t.bundle.title}
              </h3>
              <p className="text-muted-foreground">
                {t.bundle.description}
              </p>
            </div>
          </div>
          <Button asChild size="lg" variant="accent">
            <Link href="/contact">{t.bundle.cta}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
