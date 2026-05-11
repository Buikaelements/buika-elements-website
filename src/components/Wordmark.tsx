// @sync-source: prototype/chrome.jsx#Wordmark
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

/**
 * Wordmark — the Buika Elements logotype.
 *
 * The logo file (logo.png) is the full horizontal lockup (1402×225px).
 * The circle-B icon occupies the leftmost square portion (~225px).
 * We clip to that square by constraining the container's width and hiding
 * overflow — the img scales to fill the container height and the icon
 * portion is all that shows.
 */
export function Wordmark({
  size = 20,
  onDark = false,
}: {
  size?: number;
  onDark?: boolean;
}) {
  // Logo icon height matches the text cap-height, ~1.6× the font size
  const iconSize = Math.round(size * 1.6);
  return (
    <span style={{
      fontFamily: "var(--serif)",
      fontWeight: 600,
      fontSize: size,
      letterSpacing: "0.12em",
      color: onDark ? "var(--paper)" : "var(--ink)",
      textTransform: "uppercase",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.55em",
      whiteSpace: "nowrap",
      fontVariationSettings: '"opsz" 60',
    }}>
      {/* Clip container: shows only the square left portion (the circle-B icon) */}
      <span style={{
        display: "inline-block",
        width: iconSize,
        height: iconSize,
        overflow: "hidden",
        flexShrink: 0,
        borderRadius: "50%",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo.png"
          alt="Buika Elements logo"
          style={{ height: "100%", width: "auto", maxWidth: "none", display: "block" }}
        />
      </span>
      <span style={{ whiteSpace: "nowrap" }}>Buika Elements</span>
    </span>
  );
}
