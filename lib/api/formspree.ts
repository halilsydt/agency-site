/**
 * @fileoverview Formspree API client for contact form submissions.
 */

import type { ContactFormData } from "@/lib/types";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT!;

/**
 * Response from the Formspree submission.
 */
export interface FormspreeResponse {
  /** Whether the submission was successful */
  ok: boolean;
  /** Error message if submission failed */
  error?: string;
}

/**
 * Submits contact form data to Formspree.
 * Handles network errors and returns a standardized response.
 *
 * @param data - The validated contact form data
 * @returns Promise resolving to success/error response
 *
 * @example
 * ```ts
 * const result = await submitContactForm({
 *   name: 'John Doe',
 *   email: 'john@example.com',
 *   platform: 'amazon',
 *   message: 'I need help with my store.'
 * });
 *
 * if (result.ok) {
 *   showSuccessMessage();
 * } else {
 *   showError(result.error);
 * }
 * ```
 */
export async function submitContactForm(
  data: ContactFormData
): Promise<FormspreeResponse> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { ok: false, error: errorData.error || "Submission failed" };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
