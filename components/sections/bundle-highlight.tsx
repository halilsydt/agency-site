import Link from "next/link";
import { Gift } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/**
 * Bundle discount highlight section for the pricing page.
 * Prominently displays the bundle discount offer with a CTA.
 *
 * @example
 * ```tsx
 * <BundleHighlight />
 * ```
 */
export function BundleHighlight(): React.ReactElement {
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
                Bundle & Save 15%
              </h3>
              <p className="text-muted-foreground">
                Get both Amazon + Etsy services and save on your monthly package
              </p>
            </div>
          </div>
          <Button asChild size="lg" variant="accent">
            <Link href="/contact">Get Bundle Quote</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
