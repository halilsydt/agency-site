import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

/**
 * Homepage with hero placeholder section.
 * Displays agency name, tagline, and coming soon CTA.
 */
export default function Home(): React.ReactElement {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Agency Site
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Honest e-commerce consulting for Amazon &amp; Etsy sellers.
          </p>
          <div className="mt-10">
            <Button size="lg" disabled>
              Coming Soon
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
