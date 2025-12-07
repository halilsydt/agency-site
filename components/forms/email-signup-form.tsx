"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailSignupSchema,
  type EmailSignupValues,
} from "@/lib/schemas/email-signup";
import { subscribeToNewsletter } from "@/lib/api/convertkit";
import { trackEvent } from "@/lib/api/plausible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { EmailSignupStatus } from "@/lib/types";

/**
 * Props for the EmailSignupForm component.
 */
export interface EmailSignupFormProps {
  /** Compact mode for footer display (inline layout) */
  compact?: boolean;
}

/**
 * Email signup form with validation and ConvertKit integration.
 * Supports compact mode for footer and full mode for dedicated sections.
 *
 * @param props - Component props
 * @param props.compact - Enable compact inline layout
 *
 * @example
 * ```tsx
 * // Footer usage
 * <EmailSignupForm compact />
 *
 * // Dedicated section usage
 * <EmailSignupForm />
 * ```
 */
export function EmailSignupForm({
  compact = false,
}: EmailSignupFormProps): React.ReactElement {
  const [status, setStatus] = useState<EmailSignupStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<EmailSignupValues>({
    resolver: zodResolver(emailSignupSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: EmailSignupValues): Promise<void> {
    setStatus("submitting");
    setErrorMessage("");

    const result = await subscribeToNewsletter(data.email);

    if (result.ok) {
      setStatus("success");
      form.reset();
      trackEvent("email_signup");
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={
          compact
            ? "text-sm text-green-600 dark:text-green-400"
            : "text-center p-6 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800"
        }
      >
        <p className="font-medium">Thanks for subscribing!</p>
        {!compact && (
          <p className="mt-1 text-green-700 dark:text-green-300">
            Check your inbox for confirmation.
          </p>
        )}
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={compact ? "space-y-2" : "space-y-4"}
      >
        {status === "error" && (
          <div
            className={
              compact
                ? "text-sm text-red-600 dark:text-red-400"
                : "p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg"
            }
            role="alert"
          >
            <p className={compact ? "" : "text-red-700 dark:text-red-300"}>
              {errorMessage}
            </p>
          </div>
        )}

        <div className={compact ? "flex gap-2" : "space-y-4"}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={compact ? "flex-1" : ""}>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Email address for newsletter"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={status === "submitting"}
            className={compact ? "" : "w-full"}
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </Form>
  );
}
