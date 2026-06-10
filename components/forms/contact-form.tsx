"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/schemas/contact";
import { submitContactForm } from "@/lib/api/formspree";
import { trackEvent } from "@/lib/api/plausible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { ContactFormStatus } from "@/lib/types";
import { useLanguage } from "@/components/providers/language-provider";
import { getTranslations } from "@/lib/translations";

/** Right-arrow icon that nudges on hover (Atlas `.btn-green`). */
function ArrowIcon(): React.ReactElement {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      className="size-[17px] transition-transform duration-200 group-hover/submit:translate-x-[3px]"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/**
 * Contact form with validation and Formspree integration.
 * Handles form state, validation, and submission feedback.
 * Supports internationalization through the language context.
 *
 * @example
 * ```tsx
 * <ContactForm />
 * ```
 */
export function ContactForm(): React.ReactElement {
  const { locale } = useLanguage();
  const t = getTranslations(locale);
  const { toast } = useToast();

  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      platform: undefined,
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues): Promise<void> {
    setStatus("submitting");
    setErrorMessage("");

    const result = await submitContactForm(data);

    if (result.ok) {
      setStatus("success");
      form.reset();
      trackEvent("contact_form_submit", { platform: data.platform });
      toast({
        title: t.contactForm.successTitle,
        description: t.contactForm.successMessage,
      });
    } else {
      setStatus("error");
      setErrorMessage(result.error || t.contactForm.errorMessage);
      toast({
        title: t.contactForm.errorTitle || "Error",
        description: result.error || t.contactForm.errorMessage,
        variant: "destructive",
      });
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[12px] border border-line bg-green-soft p-8 text-center">
        <h3 className="font-disp text-xl font-bold text-green-d">
          {t.contactForm.successTitle}
        </h3>
        <p className="mt-2 text-green-d/80">
          {t.contactForm.successMessage}
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {status === "error" && (
          <div
            className="rounded-[12px] border border-line bg-clay-soft p-4"
            role="alert"
          >
            <p className="text-clay">{errorMessage}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.contactForm.nameLabel}</FormLabel>
              <FormControl>
                <Input placeholder={t.contactForm.namePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.contactForm.emailLabel}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t.contactForm.emailPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.contactForm.platformLabel}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t.contactForm.platformPlaceholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="amazon">{t.contactForm.platformAmazon}</SelectItem>
                  <SelectItem value="etsy">{t.contactForm.platformEtsy}</SelectItem>
                  <SelectItem value="both">{t.contactForm.platformBoth}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.contactForm.messageLabel}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t.contactForm.messagePlaceholder}
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          className="group/submit w-full justify-center gap-[9px]"
          disabled={status === "submitting"}
        >
          {status === "submitting"
            ? t.contactForm.submittingButton
            : t.contactForm.submitButton}
          {status !== "submitting" && <ArrowIcon />}
        </Button>
      </form>
    </Form>
  );
}
