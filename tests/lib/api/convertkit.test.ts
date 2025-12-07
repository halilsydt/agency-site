import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// We need to stub env vars before importing the module
const originalEnv = { ...process.env };

describe("subscribeToNewsletter", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    process.env = { ...originalEnv };
  });

  it("returns ok:true on successful subscription", async () => {
    process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID = "test-form-id";
    process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY = "test-api-key";

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ subscription: { id: 1 } }),
    } as Response);

    const { subscribeToNewsletter } = await import("@/lib/api/convertkit");
    const result = await subscribeToNewsletter("test@example.com");

    expect(result.ok).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("convertkit.com"),
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining("test@example.com"),
      })
    );
  });

  it("returns error on API failure", async () => {
    process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID = "test-form-id";
    process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY = "test-api-key";

    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 400,
    } as Response);

    const { subscribeToNewsletter } = await import("@/lib/api/convertkit");
    const result = await subscribeToNewsletter("test@example.com");

    expect(result.ok).toBe(false);
    expect(result.error).toBeDefined();
  });

  it("handles network errors gracefully", async () => {
    process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID = "test-form-id";
    process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY = "test-api-key";

    vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

    const { subscribeToNewsletter } = await import("@/lib/api/convertkit");
    const result = await subscribeToNewsletter("test@example.com");

    expect(result.ok).toBe(false);
    expect(result.error).toContain("Network error");
  });

  it("returns error when configuration is missing", async () => {
    process.env.NEXT_PUBLIC_CONVERTKIT_FORM_ID = "";
    process.env.NEXT_PUBLIC_CONVERTKIT_API_KEY = "";

    const { subscribeToNewsletter } = await import("@/lib/api/convertkit");
    const result = await subscribeToNewsletter("test@example.com");

    expect(result.ok).toBe(false);
    expect(result.error).toContain("not configured");
  });
});
