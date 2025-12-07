import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the Cal.com embed
vi.mock("@calcom/embed-react", () => ({
  default: ({ calLink }: { calLink: string }) => (
    <div data-testid="cal-embed" data-cal-link={calLink}>
      Cal.com Embed Mock
    </div>
  ),
  getCalApi: vi.fn(() => Promise.resolve(vi.fn())),
}));

import { CalendarEmbed } from "@/components/forms/calendar-embed";

describe("CalendarEmbed", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("renders Cal component when CAL_LINK is set", () => {
    vi.stubEnv("NEXT_PUBLIC_CAL_LINK", "test/consultation");

    render(<CalendarEmbed />);

    expect(screen.getByTestId("cal-embed")).toBeInTheDocument();
  });

  it("shows placeholder when CAL_LINK is not set", () => {
    vi.stubEnv("NEXT_PUBLIC_CAL_LINK", "");

    render(<CalendarEmbed />);

    expect(
      screen.getByText(/calendar booking is not configured/i)
    ).toBeInTheDocument();
  });

  it("uses calLink prop over environment variable", () => {
    vi.stubEnv("NEXT_PUBLIC_CAL_LINK", "env/link");

    render(<CalendarEmbed calLink="prop/link" />);

    expect(screen.getByTestId("cal-embed")).toHaveAttribute(
      "data-cal-link",
      "prop/link"
    );
  });

  it("renders without crashing", () => {
    vi.stubEnv("NEXT_PUBLIC_CAL_LINK", "test/event");

    const { container } = render(<CalendarEmbed />);

    expect(container).toBeInTheDocument();
  });
});
