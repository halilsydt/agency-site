/**
 * @fileoverview Zod validation schema for the email signup form.
 */

import { z } from "zod";

/**
 * Validation schema for the email signup form.
 */
export const emailSignupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

/**
 * Inferred type from the email signup schema.
 */
export type EmailSignupValues = z.infer<typeof emailSignupSchema>;
