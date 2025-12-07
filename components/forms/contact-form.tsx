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
import type { ContactFormStatus } from "@/lib/types";

/**
 * Contact form with validation and Formspree integration.
 * Handles form state, validation, and submission feedback.
 *
 * @example
 * ```tsx
 * <ContactForm />
 * ```
 */
export function ContactForm(): React.ReactElement {
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
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center p-8 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
        <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
          Thank you!
        </h3>
        <p className="mt-2 text-green-700 dark:text-green-300">
          We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {status === "error" && (
          <div
            className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg"
            role="alert"
          >
            <p className="text-red-700 dark:text-red-300">{errorMessage}</p>
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
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
              <FormLabel>Platform</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="amazon">Amazon</SelectItem>
                  <SelectItem value="etsy">Etsy</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
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
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="How can we help you?"
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
          className="w-full"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
}
