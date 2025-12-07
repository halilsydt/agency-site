/**
 * @fileoverview ConvertKit API client for newsletter subscriptions.
 */

const CONVERTKIT_FORM_ID = process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID;
const CONVERTKIT_API_KEY = process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY;

/**
 * Response from ConvertKit subscription.
 */
export interface ConvertKitResponse {
  /** Whether the subscription was successful */
  ok: boolean;
  /** Error message if subscription failed */
  error?: string;
}

/**
 * Subscribes an email address to the newsletter via ConvertKit.
 *
 * @param email - The email address to subscribe
 * @returns Promise resolving to success/error response
 *
 * @example
 * ```ts
 * const result = await subscribeToNewsletter('user@example.com');
 * if (result.ok) {
 *   showThankYouMessage();
 * }
 * ```
 */
export async function subscribeToNewsletter(
  email: string
): Promise<ConvertKitResponse> {
  // Handle missing configuration
  if (!CONVERTKIT_FORM_ID || !CONVERTKIT_API_KEY) {
    return { ok: false, error: "Newsletter signup is not configured." };
  }

  try {
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email,
        }),
      }
    );

    if (!response.ok) {
      return { ok: false, error: "Subscription failed. Please try again." };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
