import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0b0f1a 0%, #101828 55%, #131033 100%)",
          color: "#f1f5f9",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(56,189,248,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(129,140,248,0.3) 0%, rgba(129,140,248,0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7dd3fc",
          }}
        >
          {profile.title} · {profile.contact.location}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 104,
            fontWeight: 700,
            letterSpacing: -3,
            background: "linear-gradient(100deg, #7dd3fc, #818cf8, #f0abfc)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {profile.name}
        </div>
        <div
          style={{
            marginTop: 28,
            maxWidth: 860,
            textAlign: "center",
            fontSize: 30,
            lineHeight: 1.5,
            color: "#94a3b8",
          }}
        >
          AI-powered platforms · Backend APIs · Full-stack development
        </div>
      </div>
    ),
    size,
  );
}
