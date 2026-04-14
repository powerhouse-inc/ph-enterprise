import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };

export const ogImageAlt = "Powerhouse Enterprise — AI-Native Operations. Private by Architecture.";

const PH_MARK_PATH =
  "M16.8849 0L5.7651 9.20777C4.13402 10.5584 4.0154 13.0182 5.50895 14.5195L9.35592 18.3865C10.4846 19.521 10.7288 21.2645 9.95531 22.6655L7.56213 27H3.6C1.61177 27 0 25.3882 0 23.4V3.6C0 1.61177 1.61178 0 3.6 0H16.8849ZM18.9736 0L16.8966 3.78374C16.1308 5.17879 16.3718 6.91114 17.4894 8.04414L21.5704 12.1815C23.0607 13.6924 22.9274 16.158 21.2828 17.4993L9.6343 27H23.4C25.3882 27 27 25.3882 27 23.4V3.6C27 1.61178 25.3882 0 23.4 0H18.9736Z";

async function loadFonts() {
  const [medium, semiBold, bold] = await Promise.all([
    fetch(
      "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLGT9V1s.ttf"
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLEj6V1s.ttf"
    ).then((r) => r.arrayBuffer()),
    fetch(
      "https://fonts.gstatic.com/s/poppins/v24/pxiByp8kv8JHgFVrLCz7V1s.ttf"
    ).then((r) => r.arrayBuffer()),
  ]);
  return [
    { name: "Poppins", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Poppins", data: semiBold, weight: 600 as const, style: "normal" as const },
    { name: "Poppins", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

export async function createOgImageResponse() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          fontFamily: "Poppins",
          background: "#0B0D0F",
          position: "relative",
        }}
      >
        {/* Background glow — cyan */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse at 78% 50%, rgba(0,212,255,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Secondary glow — purple */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse at 30% 80%, rgba(122,58,255,0.06) 0%, transparent 50%)",
          }}
        />

        {/* Left content column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 0 64px 72px",
            position: "relative",
          }}
        >
          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: "#F3F5F7",
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
              }}
            >
              AI-Native Operations.
            </span>
            <span
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: "rgba(243,245,247,0.5)",
                letterSpacing: "-0.04em",
                lineHeight: 1.08,
              }}
            >
              Private by Architecture.
            </span>
          </div>

          {/* Gradient accent bar */}
          <div
            style={{
              width: 56,
              height: 3,
              background: "linear-gradient(90deg, #00D4FF, #7A3AFF)",
              borderRadius: 2,
              marginTop: 24,
            }}
          />

          {/* Descriptor */}
          <span
            style={{
              fontSize: 19,
              fontWeight: 500,
              color: "rgba(243,245,247,0.5)",
              marginTop: 20,
              letterSpacing: "-0.01em",
            }}
          >
            Powerhouse Enterprise
          </span>
        </div>

        {/* Right brand column */}
        <div
          style={{
            width: 380,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Glow halo */}
          <div
            style={{
              position: "absolute",
              width: 340,
              height: 340,
              display: "flex",
              borderRadius: 170,
              background:
                "radial-gradient(circle, rgba(0,212,255,0.14) 0%, rgba(122,58,255,0.05) 40%, transparent 70%)",
            }}
          />

          {/* Powerhouse mark */}
          <svg
            width="130"
            height="130"
            viewBox="0 0 27 27"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={PH_MARK_PATH}
              fill="#F3F5F7"
            />
          </svg>
        </div>

        {/* Bottom accent line — gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            display: "flex",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 20%, rgba(0,212,255,0.4) 50%, rgba(122,58,255,0.3) 70%, rgba(255,255,255,0.07) 90%, transparent 100%)",
          }}
        />
      </div>
    ),
    {
      ...ogImageSize,
      fonts,
    },
  );
}
