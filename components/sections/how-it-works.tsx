"use client";

import { Reveal } from "@/components/ui/reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/**
 * Props for the HowItWorks component.
 */
export interface HowItWorksProps {
  /** Section headline text */
  headline: string;
  /** Optional subheadline text */
  subheadline?: string;
}

/**
 * Homepage Atlas process section (atlas.css:228–236). A centered section head
 * plus a three-column `.proc` layout with vertical divider rules between steps
 * (switching to bottom borders when stacked below 820px). Each step shows a
 * green "STEP 0X" label, a title, and a description.
 *
 * The "STEP" word comes from i18n; the zero-padded number is derived from the
 * index so it stays locale-safe.
 *
 * @param props - {@link HowItWorksProps}
 */
export function HowItWorks({
  headline,
  subheadline,
}: HowItWorksProps): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);

  const steps = [
    { title: t.howItWorks.step1Title, description: t.howItWorks.step1Description },
    { title: t.howItWorks.step2Title, description: t.howItWorks.step2Description },
    { title: t.howItWorks.step3Title, description: t.howItWorks.step3Description },
  ];

  return (
    <section className="py-[92px]">
      <div className="wrap">
        {/* Centered section head */}
        <Reveal className="mx-auto mb-12 max-w-[680px] text-center">
          <span className="eyebrow cc">{t.howItWorks.eyebrow}</span>
          <h2 className="mt-5 font-disp text-[clamp(34px,4.4vw,52px)] font-bold leading-[1.02] tracking-[-.03em]">
            {headline}
          </h2>
          {subheadline && <p className="mt-[18px] text-[18px] text-soft">{subheadline}</p>}
        </Reveal>

        {/* Process steps */}
        <div className="grid grid-cols-1 min-[821px]:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal
              key={step.title}
              as="div"
              delay={(index || undefined) as 1 | 2 | undefined}
              className="relative px-[34px] max-[820px]:px-0 max-[820px]:pb-[30px] [&:first-child]:pl-0 min-[821px]:[&:not(:last-child)]:border-r min-[821px]:[&:not(:last-child)]:border-line max-[820px]:[&:not(:last-child)]:border-b max-[820px]:[&:not(:last-child)]:border-line"
            >
              <div className="font-disp text-[15px] font-bold text-green tnum">
                {t.howItWorks.stepPrefix} {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mb-[10px] mt-[22px] font-disp text-[23px] font-bold tracking-[-.01em]">
                {step.title}
              </h3>
              <p className="text-[15.5px] text-soft">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
