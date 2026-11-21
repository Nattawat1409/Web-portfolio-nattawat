import { ImageResponse } from "next/og";
import { heroMetrics, profile } from "@/lib/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card shown when the site is shared on LinkedIn, Facebook, LINE, etc.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(ellipse 80% 70% at 50% -10%, rgba(99,102,241,0.35), #090d16 70%)",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#94a3b8" }}>
          <div style={{ display: "flex", width: 12, height: 12, borderRadius: 99, background: "#22d3ee" }} />
          {profile.location}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, color: "#f8fafc", letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 40, color: "#a5b4fc", marginTop: 8 }}>{profile.role}</div>
        </div>
        <div style={{ display: "flex", gap: 48 }}>
          {heroMetrics.slice(0, 3).map((m) => (
            <div key={m.label} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 44, fontWeight: 700, color: "#f8fafc" }}>{m.value}</div>
              <div style={{ fontSize: 20, color: "#94a3b8", maxWidth: 300 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
