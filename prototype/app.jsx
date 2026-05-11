// app.jsx — Main app shell with routing, tweaks, and page mount

// @sync-target: src/components/TweaksProvider.tsx
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "serifFamily": "Source Serif 4",
  "paperWarmth": 2,
  "signalHue": "#0F2A5C",
  "heroVariant": "standard"
}/*EDITMODE-END*/;

const SERIF_STACKS = {
  "Source Serif 4": `"Source Serif 4", "EB Garamond", Georgia, serif`,
  "EB Garamond":    `"EB Garamond", Georgia, serif`,
  "Instrument Serif": `"Instrument Serif", "EB Garamond", Georgia, serif`,
};

// @sync-target: src/components/TweaksProvider.tsx
const PAPER_WARMTH_MAP = [
  { paper: "#F6F4EF", pure: "#FCFBF7", stone: "#E6E2D9", soft: "#EFEBE1" },   // 0 cooler
  { paper: "#F5F2EA", pure: "#FBF9F3", stone: "#E4DFD5", soft: "#EDE9DD" },
  { paper: "#F3EFE6", pure: "#FBF9F3", stone: "#E2DDD1", soft: "#EDE8DC" },   // 2 default
  { paper: "#F0EBDF", pure: "#F9F6EE", stone: "#DFD9CB", soft: "#EAE4D4" },
  { paper: "#EDE7D8", pure: "#F7F3E8", stone: "#DBD4C3", soft: "#E6DECC" },   // 4 warmer
];

// @sync-target: src/components/TweaksProvider.tsx
const SIGNAL_OPTIONS = ["#1E3A8A", "#16235C", "#0F2A5C", "#2D3F7C", "#3B1E47"];

const HERO_VARIANTS = ["standard", "stacked", "indexed"];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState("home");
  const [lang, setLang] = React.useState("en");
  const [contactOpen, setContactOpen] = React.useState(false);

  const copy = window.COPY[lang];

  // Apply tweaks to CSS vars
  React.useEffect(() => {
    const root = document.documentElement;
    const serif = SERIF_STACKS[t.serifFamily] || SERIF_STACKS["Source Serif 4"];
    root.style.setProperty("--serif", serif);
    const warm = PAPER_WARMTH_MAP[Math.max(0, Math.min(4, t.paperWarmth))] || PAPER_WARMTH_MAP[2];
    root.style.setProperty("--paper", warm.paper);
    root.style.setProperty("--paper-pure", warm.pure);
    root.style.setProperty("--stone", warm.stone);
    root.style.setProperty("--stone-soft", warm.soft);
    root.style.setProperty("--signal", t.signalHue);
  }, [t]);

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  // Sync hash
  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (["home", "services", "about", "resources"].includes(h) || h.startsWith("resource:")) setRoute(h);
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  React.useEffect(() => {
    if (window.location.hash.replace("#", "") !== route) {
      window.history.replaceState(null, "", `#${route}`);
    }
  }, [route]);

  const onOpenContact = () => setContactOpen(true);

  return (
    <>
      <TopNav route={route} setRoute={setRoute} lang={lang} setLang={setLang}
              onOpenContact={onOpenContact} copy={copy} />
      <main style={{ paddingTop: 0 }}>
        {route === "home" && <HomePage copy={copy} onCta={onOpenContact} heroVariant={t.heroVariant} />}
        {route === "services" && <ServicesPage copy={copy} onCta={onOpenContact} />}
        {route === "about" && <AboutPage copy={copy} onCta={onOpenContact} />}
        {route === "resources" && <ResourcesPage copy={copy} onCta={onOpenContact} lang={lang} setRoute={setRoute} />}
        {route.startsWith("resource:") && <ResourceDetailPage copy={copy} lang={lang} slug={route.slice("resource:".length)} setRoute={setRoute} onCta={onOpenContact} />}
      </main>
      <Footer copy={copy} setRoute={setRoute} onOpenContact={onOpenContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} copy={copy} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Typography" />
        <TweakSelect
          label="Serif family"
          value={t.serifFamily}
          options={Object.keys(SERIF_STACKS)}
          onChange={v => setTweak("serifFamily", v)}
        />

        <TweakSection label="Color" />
        <TweakSlider
          label="Paper warmth"
          value={t.paperWarmth}
          min={0} max={4} step={1}
          onChange={v => setTweak("paperWarmth", v)}
        />
        <div className="twk-row">
          <div className="twk-lbl"><span>Signal hue</span><span className="twk-val">{t.signalHue}</span></div>
          <div style={{ display: "flex", gap: 6 }}>
            {SIGNAL_OPTIONS.map(c => (
              <button key={c} onClick={() => setTweak("signalHue", c)}
                      style={{
                        width: 26, height: 26, borderRadius: 4,
                        background: c,
                        border: t.signalHue === c ? "2px solid #000" : "1px solid rgba(0,0,0,0.15)",
                        cursor: "pointer",
                      }} />
            ))}
          </div>
        </div>

        <TweakSection label="Hero" />
        <TweakRadio
          label="Composition"
          value={t.heroVariant}
          options={HERO_VARIANTS}
          onChange={v => setTweak("heroVariant", v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
