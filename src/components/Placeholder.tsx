// @sync-source: prototype/chrome.jsx#Placeholder
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

/**
 * Placeholder — striped tile standing in for not-yet-commissioned imagery.
 *
 * Used anywhere we need a visual block but don't have the final asset.
 * The mono label makes it unambiguously a placeholder (not a style), so
 * stakeholders reviewing the page don't mistake it for finished art.
 */
export function Placeholder({
  label,
  ratio = "4/5",
  fill = false,
  sublabel,
}: {
  label: string;
  ratio?: string;
  fill?: boolean;
  sublabel?: string;
}) {
  return (
    <div className="placeholder" style={{
      aspectRatio: fill ? undefined : ratio,
      width: "100%",
      height: fill ? "100%" : undefined,
      minHeight: fill ? undefined : 120,
    }}>
      <span className="ph-label">
        <span className="ph-dot" />
        {label}{sublabel && <span style={{ opacity: 0.5, marginLeft: 8 }}>— {sublabel}</span>}
      </span>
    </div>
  );
}
