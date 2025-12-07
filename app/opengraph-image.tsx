import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Scalenty - E-commerce Consulting for Amazon & Etsy Sellers";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              background: "white",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "24px",
            }}
          >
            <span
              style={{
                fontSize: "48px",
                fontWeight: 700,
                color: "#3b82f6",
              }}
            >
              S
            </span>
          </div>
          <span
            style={{
              fontSize: "72px",
              fontWeight: 700,
              color: "white",
            }}
          >
            Scalenty
          </span>
        </div>
        <div
          style={{
            fontSize: "32px",
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          E-commerce Consulting for Amazon & Etsy Sellers
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255, 255, 255, 0.7)",
            marginTop: "24px",
          }}
        >
          Honest advice. Real results.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
