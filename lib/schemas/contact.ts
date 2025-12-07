/**
 * @fileoverview Zod validation schema for the contact form.
 */

import { z } from "zod";

/**
 * Validation schema for the contact form.
 * Enforces required fields and format validation.
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  platform: z.enum(["amazon", "etsy", "both"], {
    message: "Please select a platform",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

/**
 * Inferred type from the contact form schema.
 */
export type ContactFormValues = z.infer<typeof contactFormSchema>;
