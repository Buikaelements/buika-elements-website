// @sync-source: prototype/copy.js#COPY
// @sync-rules: see SYNC.md → "Transformation rules". Do not edit by hand —
//   the prototype is the source of truth. Run "sync to next" to regenerate.

/**
 * Buika Elements — locked production copy (EN + ES).
 *
 * This is the TypeScript port of prototype/copy.js. Content lifted verbatim
 * from Buika_Web_Copy_v2.md; do not paraphrase or invent. If the client
 * revises copy, update this file, not the components.
 *
 * Why this lives in the codebase rather than Sanity:
 *   - Marketing surface (home, services, about, navigation, legal labels)
 *     changes on release cadence, not editorial cadence. Git tracks it.
 *   - Only whitepapers & essays go through the editor. See sanity/schemas/.
 *   - This keeps a clean split: Simon owns articles; devs own the site copy.
 *
 * Types are exported so components can import the narrow shape they need
 * instead of re-deriving from `typeof COPY.en.home`.
 */

import type { Locale } from "./i18n";

export type ValuePropItem = {
  for: string;
  outcome: string;
  body: string;
  service: string;
};

export type ValuePropCopy = {
  eyebrow: string;
  head: string;
  items: ValuePropItem[];
};

export type Copy = {
  nav: { home: string; services: string; about: string; resources: string; contact: string };
  home: HomeCopy;
  valueProp: ValuePropCopy;
  services: ServicesCopy;
  about: AboutCopy;
  resources: ResourcesCopy;
  footer: FooterCopy;
  contactModal: ContactModalCopy;
};

export type HomeCopy = {
  heroEyebrow: string;
  heroHeadline: [string, string];
  heroSub: string;
  heroCta: string;
  credibility: string[];
  positioningEyebrow: string;
  positioningHead: string;
  positioningBody: string[];
  contrastEyebrow: string;
  contrast: {
    left: { label: string; lines: string[] };
    right: { label: string; lines: string[] };
  };
  stepsEyebrow: string;
  stepsHead: string;
  steps: Array<{ n: string; title: string; body: string }>;
  whyEyebrow: string;
  whyHead: string;
  why: Array<{ label: string; body: string }>;
  statement: string;
  bottomCta: { head: string; body: string; cta: string };
};

export type ServicesCopy = {
  eyebrow: string;
  head: string;
  sub: string;
  list: Array<{
    situation: string;
    title: string;
    intro: string;
    bullets: string[];
    outcome: string;
  }>;
  bottomCta: { head: string; body: string; cta: string };
};

export type AboutCopy = {
  eyebrow: string;
  head: string;
  sub: string;
  bio: {
    name: string;
    title: string;
    paragraphs: string[];
    location: string;
  };
  statsEyebrow: string;
  stats: Array<{ n: string; label: string }>;
  operateEyebrow: string;
  operateHead: string;
  operate: string[];
  statement: string;
  bottomCta: { head: string; body: string; cta: string };
};

export type ResourcesCopy = {
  eyebrow: string;
  head: string;
  sub: string;
  filters: string[];
  newsletter: { head: string; placeholder: string; cta: string };
  hub: {
    eyebrow: string;
    head: string;
    body: string;
    cta: string;
    url: string;
    meta: string;
  };
  /**
   * Legacy: static article list from the prototype. Resources index now pulls
   * from Sanity via getResourcesIndex(); these remain only as fallback labels
   * and for offline dev when NEXT_PUBLIC_USE_MOCK_DATA is truthy.
   */
  articles: Array<{
    category: string;
    gated?: boolean;
    date: string;
    read: string;
    lang: string;
    title: string;
    excerpt: string;
  }>;
};

export type FooterCopy = {
  positioning: string;
  nav: string;
  navItems: string[];
  legal: string;
  legalItems: string[];
  contact: string;
  email: string;
  address: string;
  linkedin: string;
  book: string;
  copy: string;
};

export type ContactModalCopy = {
  eyebrow: string;
  head: string;
  sub: string;
  name: string;
  company: string;
  email: string;
  brief: string;
  briefPh: string;
  country: string;
  consent: string;
  submit: string;
  success: string;
  close: string;
};

export const COPY: Record<Locale, Copy> = {
  en: {
    nav: { home: "Home", services: "Value Proposition", about: "About", resources: "Resources", contact: "Contact" },
    home: {
      heroEyebrow: "Production Partner · Asia",
      heroHeadline: ["Your buying team in Asia.", "No conflict of interest."],
      heroSub:
        "We select the right manufacturer for your product, manage the introduction, and stay as your strategic partner throughout the relationship. You work directly with the factory. We make sure it's the right one.",
      heroCta: "Let's talk",
      credibility: [
        "China, Vietnam, Bangladesh, Myanmar",
        "Workwear · Outdoor · Sportswear",
        "EN ISO · CSRD · CSDDD",
      ],
      positioningEyebrow: "What Buika Elements is",
      positioningHead: "Not a sourcing agent. Your production partner in Asia.",
      positioningBody: [
        "Most brands working in Asia deal with one of two problems: going direct to a factory that only pushes its own capacity, or working with an agent who is somewhere in the middle without real accountability.",
        "Buika Elements is neither. We are the external buying team that European workwear, outdoor and sportswear brands without an in-house Asia presence need — the equivalent of a Head of Asia Sourcing, without the fixed overhead. 16 years of manufacturer-side experience, a consolidated network of selected factories, and accountability that sits entirely with the client.",
      ],
      contrastEyebrow: "The difference in practice",
      contrast: {
        left: {
          label: "Direct factory",
          lines: [
            "Recommends itself.",
            "Fills its own lines.",
            "Defends its own interests when problems arise.",
          ],
        },
        right: {
          label: "Buika Elements",
          lines: [
            "Recommends the right factory for your product.",
            "Defends your brief.",
            "Always on your side.",
          ],
        },
      },
      stepsEyebrow: "How we work",
      stepsHead: "A structured process, not a transaction",
      steps: [
        {
          n: "01",
          title: "We understand your situation before we recommend anything",
          body: "Before we mention a factory, we need to understand your product, your compliance requirements, your target price, and your timeline. Most sourcing conversations start with a quote. Ours start with questions. That's how we avoid recommending the wrong country, the wrong factory, or the wrong season to make the move.",
        },
        {
          n: "02",
          title: "We select, introduce, and hand over — cleanly",
          body: "We apply the same factory selection criterion we've built over 16 years: product-country matching, compliance readiness, production history. Once we've selected the right factory, we make the introduction formally — with a technical brief that ensures the factory team has everything they need to start. From that point, you work directly with them. We set the relationship up properly so it runs without us in the middle.",
        },
        {
          n: "03",
          title: "We stay as your strategic layer — without getting in the way",
          body: "We review the relationship every season: is the factory delivering? Are there compliance gaps appearing? Is the country still the right fit as volumes grow? We are the first call when something strategic needs to be decided — a country transition, a compliance audit, a new product category. Not every conversation, but the ones that matter.",
        },
      ],
      whyEyebrow: "What makes us different",
      whyHead: "Four things, stated plainly",
      why: [
        {
          label: "Factory intelligence",
          body: "We have spent years working on the manufacturer side. We know how a factory thinks, what a FOB price conceals, and when a lead time is real. That knowledge works in your favour.",
        },
        {
          label: "16 years of own network",
          body: "3–5 consolidated factory relationships across China, Vietnam, and Bangladesh. Built over 16 years. Not a directory — real production history with every partner.",
        },
        {
          label: "Based in Da Nang, Vietnam",
          body: "Physical presence in Southeast Asia — not a European office managing emails. Direct factory access, real-time market intelligence, immediate response capacity.",
        },
        {
          label: "EU compliance expertise",
          body: "We bridge the gap between what a CSRD auditor requires and what a factory in Asia can actually document. Supply chain traceability, scope 3 reporting, CSDDD due diligence.",
        },
      ],
      statement: "Transparency is not a risk — it's what makes the relationship work.",
      bottomCta: {
        head: "Ready to stop guessing which factory is right for your product?",
        body: "Tell us what you're working on. We'll tell you which country, which type of factory, and what a realistic price looks like — before you commit to anything.",
        cta: "Start the conversation",
      },
    },
    valueProp: {
      eyebrow: "What we deliver",
      head: "Four situations. One consistent answer.",
      items: [
        {
          for: "Entering Asia or moving production to a new country",
          outcome: "The right factory from day one. Not the nearest one.",
          body: "Before we name a factory, we document your product, your compliance requirements, and your timeline. 16 years of selection criteria — country fit, factory profile, certification readiness — determine the recommendation. We make the introduction with a full technical brief. You walk into a direct factory relationship that was built to last.",
          service: "Factory selection & introduction →",
        },
        {
          for: "Active production in Asia — no strategic layer on the ground",
          outcome: "Your production decisions covered. Without adding a headcount.",
          body: "Once the factory relationship runs, the risk is letting it drift. We review every season: performance, compliance gaps, country fit as volumes grow. When something strategic needs deciding — a country transition, an audit, a new product category — we are the first call. The judgment of a Head of Asia Sourcing, without the fixed overhead.",
          service: "Integrated production partner →",
        },
        {
          for: "Expanding range width without starting from a blank page",
          outcome: "New products in market faster. Without your own design infrastructure.",
          body: "Our supplier network develops 400+ new items per season — workwear, outdoor, softshell, rainwear, knitwear — with in-house design teams and certification pathways already in place. We act as the interface: curating, adapting, and white-labelling products to your market requirements. Three modes: periodic trend access, full ODM adaptation, or white-label direct.",
          service: "ODM & catalogue access →",
        },
        {
          for: "Managing CSRD, CSDDD or supply chain due diligence",
          outcome: "The compliance file built before the auditor arrives.",
          body: "EU regulations are now cascading into Asia supply chains. The factories can comply — nobody has asked the right questions yet. We map beyond tier-1, collect CSRD scope 3 data from Asian suppliers, and build the CSDDD due diligence file. Reactive compliance costs more. We build the documentation in advance.",
          service: "EU compliance & sourcing advisory →",
        },
      ],
    },
    services: {
      eyebrow: "Value Proposition",
      head: "Four ways we work with you",
      sub: "From feasibility study to integrated production partner — each engagement is scoped to match where you are and what you need to solve. Every engagement starts with a diagnosis, not a package.",
      list: [
        {
          situation: "For European workwear, outdoor and sportswear brands that want to operate in Asia without building an in-house team",
          title: "Production Partner",
          intro:
            "The core model. We cover all three phases — diagnosis and factory selection, introduction and onboarding, and ongoing strategic KAM — so the relationship with Asia is managed with the same continuity and market perspective as an internal head of sourcing, without the fixed overhead.",
          bullets: [
            "Phase 1 — Diagnosis & selection: product, volumes and compliance analysis; country recommendation with documented rationale; factory selection from our consolidated network",
            "Phase 2 — Introduction & onboarding: structured technical brief to the factory; direct client–factory communication from day one; onboarding support until first sample approval",
            "Phase 3 — Ongoing strategic KAM: seasonal performance reviews, price benchmarking, compliance monitoring, and proactive market intelligence — without you needing to ask",
            "Multi-country flexibility: production diversification across China, Vietnam, Bangladesh, or Myanmar as volumes and requirements evolve",
          ],
          outcome:
            "The expertise, network and continuity of a Head of Asia Sourcing — without the fixed cost of an in-house hire.",
        },
        {
          situation: "For brands entering a new product category, testing a market segment, or scaling range width without development investment",
          title: "ODM Product Development & Catalogue Access",
          intro:
            "Through our supplier network, we give brands direct access to original product development, seasonal design catalogues and white-label production. Suppliers develop 400+ new items per season across workwear, high-visibility, outdoor, softshell, rainwear and knitwear — with in-house design teams, technical development capability, and established certification pathways.",
          bullets: [
            "Trend provider: periodic access to supplier seasonal catalogues — market intelligence for range planning before competitors see what is being developed in Asia",
            "ODM product developer: select products from supplier catalogue; we adapt construction, fabric, colourway, trims and certifications to match your spec and market requirements",
            "White-label: supplier-developed products under your label with minimal modification — fastest route to range expansion without development investment",
          ],
          outcome:
            "Range width and product development capability without the infrastructure. Subject to compliance review per market and product category.",
        },
        {
          situation: "For companies evaluating whether and how to start or relocate production in Asia — before committing to any factory",
          title: "Manufacturing Feasibility Study",
          intro:
            "A standalone written report that answers the decision your board needs to make before any factory conversation starts. Independent intelligence — not a factory catalogue.",
          bullets: [
            "Country recommendation with documented rationale: why Vietnam, Bangladesh, China or Myanmar is or is not the right answer for your specific range",
            "Factory profile required: technical capability, certifications, minimum order structure — not a named factory, a defined profile",
            "Compliance obligations mapped: EN certifications, CSRD scope 3, CSDDD due diligence — and how achievable they are in the recommended country",
            "Realistic cost and lead time benchmarks — not a quote, a benchmark that protects against unrealistic expectations",
            "Phased roadmap from decision to first production order, with realistic timelines and decision gates",
          ],
          outcome:
            "A written report delivered within 2–3 weeks of brief receipt. The decision made with independent intelligence, not a factory's sales pitch.",
        },
        {
          situation: "For brands with a live or imminent order facing a quality issue, delay, compliance gap, or price dispute",
          title: "Supply Chain Solutions",
          intro:
            "Tactical, order-level support for brands that need analysis and resolution on a specific order — with or without an ongoing relationship with Buika Elements. The scope is defined by the order: one project, one shipment, one production run, one problem.",
          bullets: [
            "Prevention mode — before the order is placed: order risk review, FOB price breakdown analysis, lead time viability assessment against product complexity and factory capacity",
            "Resolution mode — when a problem is active: quality escalation at factory level, delay diagnosis and recovery plan, compliance gap identification and closure before shipment",
            "No ongoing engagement required — can be activated for a single order with a factory the brand manages independently",
            "Deliverable: concrete analysis and a specific action plan. Engagement can start within 48 hours of brief receipt",
          ],
          outcome:
            "Order-level expertise, activated when you need it. Without committing to an ongoing relationship.",
        },
      ],
      bottomCta: {
        head: "Not sure which engagement fits your situation?",
        body: "Tell us where you are and what you're trying to solve. We'll suggest the right structure in a first call — no pitch deck, no fixed packages.",
        cta: "Book a call",
      },
    },
    about: {
      eyebrow: "About",
      head: "Built from the inside out.",
      sub: "Most sourcing consultants learn Asia from the buying side. We learned it from both, the buyer side and the factory side.",
      bio: {
        name: "Simon Caballero",
        title: "Founder, Buika Elements",
        paragraphs: [
          "I spent over a decade as Head of Purchasing at one of Europe's leading workwear brands, managing production across China, Vietnam, Bangladesh, and Myanmar. That experience taught me how factories actually think: what they optimise for, where the margin is hidden in a FOB price, and when a quality promise is real or aspirational.",
          "I founded Buika Elements because I saw a gap that nobody was filling honestly. Brands going direct to factories were getting capacity, not advice. Brands using agents were getting a middle layer with no real accountability. Neither was what a European brand actually needed.",
          "What I built is different: a network of manufacturers I know personally, a structured way of matching each product to the right country and factory, and the understanding of what European brands need from their Asia supply chain in 2025 — not just product, but compliance documentation, multi-country flexibility, and someone who defends their brief when things get complicated.",
        ],
        location: "Da Nang, Vietnam.",
      },
      statsEyebrow: "Credentials",
      stats: [
        { n: "16+", label: "Years on the ground in Asia" },
        { n: "$200M+", label: "Managed in production volume" },
        { n: "50M+", label: "Garments exported" },
        { n: "4", label: "Countries of active production" },
      ],
      operateEyebrow: "Principles",
      operateHead: "A few things that define how we operate",
      operate: [
        "Before we recommend a factory, we document your situation. The diagnosis comes before the recommendation — always.",
        "We tell clients which factory we use and why. Transparency is not a risk — it's what makes the relationship work.",
        "Day-to-day technical communication goes directly between client and factory. We set the relationship up so it runs cleanly without us in the middle.",
        "We work with a small number of clients at any given time. Relationships, not volume.",
      ],
      statement: "Relationships, not volume.",
      bottomCta: {
        head: "Want to understand if Buika Elements is the right fit for your situation?",
        body: "A 30-minute call is enough. No pitch deck. Just a direct conversation about what you're trying to solve.",
        cta: "Get in touch",
      },
    },
    resources: {
      eyebrow: "Resources",
      head: "Essays and whitepapers on producing in Asia for European brands.",
      sub: "Field notes from Da Nang. Written by Simon, not a content team.",
      filters: ["All", "Essays", "Whitepapers", "Field notes"],
      newsletter: {
        head: "Occasional field notes on producing in Asia. No spam.",
        placeholder: "your@email.com",
        cta: "Subscribe",
      },
      hub: {
        eyebrow: "Reference tool",
        head: "EU Workwear Regulations — Knowledge Hub",
        body: "A live reference covering PPE categories, EN ISO standards, CSRD, CSDDD, and REACH — with factory-side action points for every regulation. Built for the factories in our network. Available to any European brand that needs to understand what the regulations actually require.",
        cta: "Open the hub",
        url: "https://hoabui4396.github.io/EU-Workwear-Regulation-Hub-EN-ES-_Rev5/",
        meta: "Daily digest · EU-27 + UK + Norway · Free",
      },
      articles: [
        {
          category: "Whitepaper",
          gated: true,
          date: "March 2026",
          read: "32-page PDF",
          lang: "EN · ES",
          title:
            "CSRD for European workwear brands producing in Asia: what factories can and cannot document today",
          excerpt:
            "A practical reading of CSRD scope 3 Category 1 requirements, what tier-1 and tier-2 suppliers in China, Vietnam, and Bangladesh actually track, and how to close the gap before your first audit.",
        },
        {
          category: "Essay",
          date: "February 2026",
          read: "9 min read",
          lang: "EN · ES",
          title: "What a FOB price actually hides",
          excerpt:
            "Three things the quote on the PI does not show you — and the two questions you should always ask before accepting a number from a factory you have not visited.",
        },
        {
          category: "Field note",
          date: "January 2026",
          read: "6 min read",
          lang: "EN",
          title:
            "Why Vietnam and Bangladesh are no longer interchangeable for technical outerwear",
          excerpt:
            "Lead time reality, fabric availability, and the slow structural shift that European buyers are ignoring at the quoting stage.",
        },
        {
          category: "Essay",
          date: "December 2025",
          read: "11 min read",
          lang: "EN · ES",
          title: "The third option between going direct and using a sourcing agent",
          excerpt:
            "Why the two dominant models for European brands producing in Asia both fail the same way — and what an external buying team does differently.",
        },
        {
          category: "Whitepaper",
          gated: true,
          date: "November 2025",
          read: "24-page PDF",
          lang: "EN",
          title: "Country-Product Matching Framework: an introduction",
          excerpt:
            "The structured criteria we use to match a product specification to a country and factory profile. First public outline of the selection mechanism.",
        },
        {
          category: "Field note",
          date: "October 2025",
          read: "5 min read",
          lang: "EN · ES",
          title: "A morning in a softshell mill outside Ningbo",
          excerpt:
            "Notes on what you see on a technical fabric audit that never makes it onto the PI.",
        },
      ],
    },
    footer: {
      positioning: "Production partner in Asia for European B2B brands. Da Nang, Vietnam.",
      nav: "Navigation",
      navItems: ["Home", "Value Proposition", "About", "Resources"],
      legal: "Legal",
      legalItems: ["Privacy", "Terms"],
      contact: "Contact",
      email: "simon@buikaelements.com",
      address: "Da Nang, Vietnam",
      linkedin: "LinkedIn",
      book: "Book a 30-min call",
      copy: "© 2026 Buika Elements",
    },
    contactModal: {
      eyebrow: "Start the conversation",
      head: "Tell us what you're working on.",
      sub: "We'll tell you which country, which type of factory, and what a realistic price looks like.",
      name: "Name",
      company: "Company",
      email: "Email",
      brief: "What you're producing or trying to solve",
      briefPh:
        "Tell us what you're working on. We'll tell you which country, which type of factory, and what a realistic price looks like.",
      country: "Country of production (optional)",
      consent: "I agree to Buika Elements contacting me about my inquiry.",
      submit: "Start the conversation",
      success: "Thank you. Simon will reply within 24 hours.",
      close: "Close",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      services: "Propuesta de Valor",
      about: "Sobre nosotros",
      resources: "Recursos",
      contact: "Contacto",
    },
    home: {
      heroEyebrow: "Production Partner · Asia",
      heroHeadline: ["Tu equipo de compras en Asia.", "Sin conflicto de intereses."],
      heroSub:
        "Seleccionamos el fabricante adecuado para tu producto, gestionamos la introducción y nos quedamos como tu partner estratégico. Tú trabajas directamente con la fábrica. Nosotros nos aseguramos de que sea la correcta.",
      heroCta: "Hablemos",
      credibility: [
        "China, Vietnam, Bangladesh, Myanmar",
        "Workwear · Outdoor · Sportswear",
        "EN ISO · CSRD · CSDDD",
      ],
      positioningEyebrow: "Qué es Buika Elements",
      positioningHead: "No somos un agente de sourcing. Somos tu production partner en Asia.",
      positioningBody: [
        "La mayoría de marcas que trabajan en Asia se encuentran con uno de dos problemas: ir directo a una fábrica que solo empuja su propia capacidad, o trabajar con un agente que está en medio sin accountability real.",
        "Buika Elements no es ninguno de los dos. Somos el equipo de compras externo que las marcas europeas de workwear, outdoor y sportswear sin presencia interna en Asia necesitan — el equivalente a un Director de Compras Asia, sin el coste fijo. 16 años de experiencia desde el lado del fabricante, una red consolidada de fábricas seleccionadas, y accountability exclusivamente con el cliente.",
      ],
      contrastEyebrow: "La diferencia en la práctica",
      contrast: {
        left: {
          label: "Fábrica directa",
          lines: [
            "Se recomienda a sí misma.",
            "Llena sus líneas.",
            "Defiende sus propios intereses cuando hay problemas.",
          ],
        },
        right: {
          label: "Buika Elements",
          lines: [
            "Recomienda la fábrica adecuada para tu producto.",
            "Defiende tu brief.",
            "Siempre de tu lado.",
          ],
        },
      },
      stepsEyebrow: "Cómo trabajamos",
      stepsHead: "Un proceso estructurado, no una transacción",
      steps: [
        {
          n: "01",
          title: "Entendemos tu situación antes de recomendar nada",
          body: "Antes de mencionar ninguna fábrica, necesitamos entender tu producto, tus requisitos de compliance, tu precio objetivo y tu timeline. La mayoría de conversaciones de sourcing empiezan con una cotización. Las nuestras empiezan con preguntas. Así evitamos recomendar el país equivocado, la fábrica equivocada o la temporada equivocada para hacer el cambio.",
        },
        {
          n: "02",
          title: "Seleccionamos, presentamos y hacemos el traspaso — con estructura",
          body: "Aplicamos el mismo criterio de selección de fábrica que hemos construido durante 16 años: matching producto-país, capacidad de compliance, historial de producción. Una vez seleccionada la fábrica adecuada, hacemos la introducción formalmente — con un brief técnico que asegura que el equipo de la fábrica tiene todo lo que necesita desde el primer día. A partir de ahí, tú trabajas directamente con ellos.",
        },
        {
          n: "03",
          title: "Nos quedamos como tu capa estratégica — sin interponernos",
          body: "Revisamos la relación cada temporada: ¿está funcionando la fábrica? ¿hay gaps de compliance? ¿sigue siendo el país adecuado a medida que crecen los volúmenes? Somos la primera llamada cuando hay que tomar una decisión estratégica — una transición de país, una auditoría de compliance, una nueva categoría de producto.",
        },
      ],
      whyEyebrow: "Lo que nos diferencia",
      whyHead: "Cuatro cosas, dichas con claridad",
      why: [
        {
          label: "Inteligencia de fabricante",
          body: "Llevamos años trabajando del lado del fabricante. Sabemos cómo piensa una fábrica, qué esconde un precio FOB y cuándo un plazo es real. Ese conocimiento trabaja a tu favor.",
        },
        {
          label: "16 años de red propia",
          body: "3–5 relaciones consolidadas con fábricas en China, Vietnam y Bangladesh. Construidas durante 16 años. No un directorio — historial de producción real con cada partner.",
        },
        {
          label: "Base en Da Nang, Vietnam",
          body: "Presencia física en el Sudeste Asiático — no una oficina europea gestionando emails. Acceso directo a fábricas, inteligencia de mercado en tiempo real, capacidad de respuesta inmediata.",
        },
        {
          label: "Expertise en compliance EU",
          body: "Hacemos el puente entre lo que necesita un auditor CSRD y lo que puede documentar una fábrica en Asia. Trazabilidad de supply chain, reporting scope 3, due diligence CSDDD.",
        },
      ],
      statement: "La transparencia no es un riesgo — es lo que hace que la relación funcione.",
      bottomCta: {
        head: "¿Listo para dejar de adivinar cuál es la fábrica adecuada para tu producto?",
        body: "Cuéntanos en qué estás trabajando. Te decimos qué país, qué tipo de fábrica y cómo es un precio realista — antes de que te comprometas con nada.",
        cta: "Empieza la conversación",
      },
    },
    valueProp: {
      eyebrow: "Lo que entregamos",
      head: "Cuatro situaciones. Una respuesta consistente.",
      items: [
        {
          for: "Entrando en Asia o cambiando de país de producción",
          outcome: "La fábrica correcta desde el primer día. No la más cercana.",
          body: "Antes de nombrar ninguna fábrica, documentamos tu producto, tus requisitos de compliance y tu timeline. 16 años de criterios de selección — encaje de país, perfil de fábrica, capacidad de certificación — determinan la recomendación. Hacemos la introducción con un brief técnico completo. Entras en una relación directa con la fábrica construida para durar.",
          service: "Selección e introducción de fábrica →",
        },
        {
          for: "Producción activa en Asia — sin capa estratégica sobre el terreno",
          outcome: "Tus decisiones de producción, cubiertas. Sin añadir headcount.",
          body: "Una vez la relación con la fábrica funciona, el riesgo es dejarla derivar. Revisamos cada temporada: rendimiento, gaps de compliance, encaje de país a medida que crecen los volúmenes. Cuando hay que tomar una decisión estratégica — una transición, una auditoría, una nueva categoría — somos la primera llamada. El juicio de un Director de Compras Asia, sin el coste fijo.",
          service: "Partner de producción integrado →",
        },
        {
          for: "Ampliar gama sin empezar desde cero",
          outcome: "Nuevos productos en mercado más rápido. Sin infraestructura de diseño propia.",
          body: "Nuestra red de proveedores desarrolla 400+ nuevas referencias por temporada — workwear, outdoor, softshell, lluvia, knitwear — con equipos de diseño internos y vías de certificación consolidadas. Somos la interfaz: curamos, adaptamos y hacemos white-label de productos según tus requisitos de mercado. Tres modalidades: acceso a tendencias, adaptación ODM completa, o white-label directo.",
          service: "ODM y acceso a catálogo →",
        },
        {
          for: "Gestionando CSRD, CSDDD o due diligence de cadena de suministro",
          outcome: "El archivo de compliance construido antes de que llegue el auditor.",
          body: "Las regulaciones europeas están llegando a las cadenas de suministro en Asia. Las fábricas pueden cumplir — nadie les ha hecho todavía las preguntas correctas. Mapeamos más allá del tier-1, recogemos datos CSRD scope 3 de proveedores asiáticos y construimos el archivo de due diligence CSDDD. El compliance reactivo cuesta más. Nosotros construimos la documentación con antelación.",
          service: "Advisory de compliance EU y sourcing →",
        },
      ],
    },
    services: {
      eyebrow: "Propuesta de Valor",
      head: "Cuatro formas en que trabajamos contigo",
      sub: "Desde el estudio de viabilidad hasta el partner de producción integrado — cada colaboración se diseña según dónde estás y qué necesitas resolver. Siempre empieza con un diagnóstico, no con un paquete.",
      list: [
        {
          situation: "Para marcas europeas de workwear, outdoor y sportswear que quieren operar en Asia sin montar un equipo propio",
          title: "Production Partner",
          intro:
            "El modelo principal. Cubrimos las tres fases — diagnóstico y selección de fábrica, introducción y onboarding, y KAM estratégico continuo — para que la relación con Asia se gestione con la misma continuidad y visión de mercado que un Director de Compras Asia interno, sin el coste fijo.",
          bullets: [
            "Fase 1 — Diagnóstico y selección: análisis de producto, volúmenes y compliance; recomendación de país con justificación documentada; selección de fábrica de nuestra red consolidada",
            "Fase 2 — Introducción y onboarding: brief técnico estructurado a la fábrica; comunicación directa cliente–fábrica desde el primer día; soporte de onboarding hasta la aprobación de primera muestra",
            "Fase 3 — KAM estratégico continuo: revisiones de rendimiento por temporada, benchmarking de precios, seguimiento de compliance e inteligencia de mercado proactiva — sin que tengas que pedirlo",
            "Flexibilidad multi-país: diversificación de producción entre China, Vietnam, Bangladesh o Myanmar según evolucionen volúmenes y requisitos",
          ],
          outcome:
            "La expertise, la red y la continuidad de un Director de Compras Asia — sin el coste fijo de una contratación interna.",
        },
        {
          situation: "Para marcas que entran en una nueva categoría de producto, testean un segmento o amplían gama sin inversión en desarrollo",
          title: "Desarrollo ODM y Acceso a Catálogo de Proveedores",
          intro:
            "A través de nuestra red de proveedores, damos a las marcas acceso directo a desarrollo de producto original, catálogos de diseño estacionales y producción white-label. Los proveedores desarrollan 400+ nuevas referencias por temporada en workwear, alta visibilidad, outdoor, softshell, lluvia y knitwear — con equipos de diseño internos, capacidad de desarrollo técnico y vías de certificación consolidadas.",
          bullets: [
            "Trend provider: acceso periódico a catálogos estacionales de proveedores — inteligencia de mercado para planificación de gama antes de que la competencia vea qué se está desarrollando en Asia",
            "Desarrollador ODM: seleccionas productos del catálogo del proveedor; nosotros adaptamos construcción, tejido, color, avíos y certificaciones para que encajen con tus especificaciones y mercado",
            "White-label: productos desarrollados por el proveedor bajo tu marca con modificaciones mínimas — la ruta más rápida para ampliar gama sin inversión en desarrollo",
          ],
          outcome:
            "Amplitud de gama y capacidad de desarrollo de producto sin la infraestructura. Sujeto a revisión de compliance por mercado y categoría de producto.",
        },
        {
          situation: "Para empresas que evalúan si y cómo empezar o reubicar producción en Asia — antes de comprometerse con ninguna fábrica",
          title: "Estudio de Viabilidad de Fabricación",
          intro:
            "Un informe escrito independiente que responde la decisión que tu dirección necesita tomar antes de empezar cualquier conversación con fábricas. Inteligencia independiente — no un catálogo de fábricas.",
          bullets: [
            "Recomendación de país con justificación documentada: por qué Vietnam, Bangladesh, China o Myanmar es o no la respuesta correcta para tu gama específica",
            "Perfil de fábrica necesario: capacidad técnica, certificaciones, estructura de pedido mínimo — no una fábrica concreta, un perfil definido",
            "Obligaciones de compliance mapeadas: certificaciones EN, CSRD scope 3, due diligence CSDDD — y qué tan alcanzables son en el país recomendado",
            "Benchmarks realistas de coste y plazo de entrega — no una oferta, un benchmark que protege frente a expectativas irreales",
            "Hoja de ruta por fases desde la decisión hasta el primer pedido de producción, con plazos y puntos de decisión realistas",
          ],
          outcome:
            "Un informe escrito entregado en 2–3 semanas desde la recepción del brief. La decisión tomada con inteligencia independiente, no con el discurso comercial de una fábrica.",
        },
        {
          situation: "Para marcas con un pedido activo o inminente con un problema concreto — incidencia de calidad, retraso, gap de compliance o disputa de precio",
          title: "Soluciones de Cadena de Suministro",
          intro:
            "Soporte táctico a nivel de pedido para marcas que necesitan análisis y resolución en un pedido concreto — con o sin relación continua con Buika Elements. El alcance lo define el pedido: un proyecto, un envío, una producción, un problema.",
          bullets: [
            "Modo prevención — antes de colocar el pedido: revisión de riesgos del pedido, análisis de desglose del precio FOB, evaluación de viabilidad del plazo frente a complejidad del producto y capacidad de la fábrica",
            "Modo resolución — cuando hay un problema activo: escalado de calidad a nivel de fábrica, diagnóstico de retraso y plan de recuperación, identificación y cierre de gaps de compliance antes del envío",
            "Sin relación continua necesaria — puede activarse para un pedido concreto con una fábrica que la marca gestiona de forma independiente",
            "Entregable: análisis concreto y plan de acción específico. La colaboración puede iniciarse en 48 horas desde la recepción del brief",
          ],
          outcome:
            "Expertise a nivel de pedido, activada cuando la necesitas. Sin comprometerte a una relación continua.",
        },
      ],
      bottomCta: {
        head: "¿No estás seguro de qué colaboración encaja en tu situación?",
        body: "Cuéntanos dónde estás y qué intentas resolver. Te propondremos la estructura adecuada en una primera llamada — sin pitch deck, sin paquetes fijos.",
        cta: "Reservar llamada",
      },
    },
    about: {
      eyebrow: "Sobre nosotros",
      head: "Construido desde dentro.",
      sub: "La mayoría de consultores de sourcing aprenden Asia desde el lado de la compra. Nosotros lo aprendimos desde ambos, el lado del comprador y el de la fábrica.",
      bio: {
        name: "Simon Caballero",
        title: "Fundador, Buika Elements",
        paragraphs: [
          "Pasé más de una década como Director de Compras en una de las principales marcas de workwear europeas, gestionando producción en China, Vietnam, Bangladesh y Myanmar. Esa experiencia me enseñó cómo piensan realmente las fábricas: qué optimizan, dónde está el margen escondido en un precio FOB, y cuándo una promesa de calidad es real o aspiracional.",
          "Fundé Buika Elements porque vi un espacio que nadie estaba cubriendo con honestidad. Las marcas que iban directas a fábricas obtenían capacidad, no consejo. Las que usaban agentes tenían una capa intermedia sin accountability real. Ninguno de los dos era lo que una marca europea realmente necesitaba.",
          "Lo que construí es diferente: una red de fabricantes que conozco personalmente, una forma estructurada de hacer matching entre cada producto y el país y fábrica correcta, y el entendimiento de lo que las marcas europeas necesitan de su cadena de suministro en Asia en 2025 — no solo producto, sino documentación de compliance, flexibilidad multi-país y alguien que defienda su brief cuando las cosas se complican.",
        ],
        location: "Da Nang, Vietnam.",
      },
      statsEyebrow: "Credenciales",
      stats: [
        { n: "16+", label: "Años sobre el terreno en Asia" },
        { n: "+200M$", label: "Gestionados en volumen de producción" },
        { n: "+50M", label: "Prendas exportadas" },
        { n: "4", label: "Países de producción activa" },
      ],
      operateEyebrow: "Principios",
      operateHead: "Algunas cosas que definen nuestra forma de trabajar",
      operate: [
        "Antes de recomendar una fábrica, documentamos tu situación. El diagnóstico va antes que la recomendación — siempre.",
        "Le decimos al cliente qué fábrica usamos y por qué. La transparencia no es un riesgo — es lo que hace que la relación funcione.",
        "La comunicación técnica del día a día va directamente entre cliente y fábrica. Montamos la relación para que funcione sola sin que estemos en medio.",
        "Trabajamos con un número reducido de clientes en cada momento. Relaciones, no volumen.",
      ],
      statement: "Relaciones, no volumen.",
      bottomCta: {
        head: "¿Quieres saber si Buika Elements encaja con tu situación?",
        body: "Con 30 minutos es suficiente. Sin presentación. Solo una conversación directa sobre lo que quieres resolver.",
        cta: "Ponte en contacto",
      },
    },
    resources: {
      eyebrow: "Recursos",
      head: "Ensayos y whitepapers sobre producir en Asia para marcas europeas.",
      sub: "Notas de campo desde Da Nang. Escrito por Simon, no por un equipo de contenidos.",
      filters: ["Todo", "Ensayos", "Whitepapers", "Notas de campo"],
      newsletter: {
        head: "Notas ocasionales sobre producir en Asia. Sin spam.",
        placeholder: "tu@email.com",
        cta: "Suscribirse",
      },
      hub: {
        eyebrow: "Herramienta de referencia",
        head: "Normativa UE para workwear — Knowledge Hub",
        body: "Referencia en vivo con categorías PPE, normas EN ISO, CSRD, CSDDD y REACH — con puntos de acción desde el lado de la fábrica para cada regulación. Construida para las fábricas de nuestra red. Disponible para cualquier marca europea que necesite entender qué requieren realmente las regulaciones.",
        cta: "Abrir el hub",
        url: "https://hoabui4396.github.io/EU-Workwear-Regulation-Hub-EN-ES-_Rev5/",
        meta: "Digest diario · EU-27 + UK + Noruega · Gratuito",
      },
      articles: [
        {
          category: "Whitepaper",
          gated: true,
          date: "Marzo 2026",
          read: "PDF 32 páginas",
          lang: "EN · ES",
          title:
            "CSRD para marcas europeas de workwear produciendo en Asia: qué pueden documentar las fábricas hoy",
          excerpt:
            "Una lectura práctica de los requisitos de CSRD scope 3 Category 1, qué registran realmente los proveedores tier-1 y tier-2 en China, Vietnam y Bangladesh, y cómo cerrar el gap antes de tu primera auditoría.",
        },
        {
          category: "Ensayo",
          date: "Febrero 2026",
          read: "9 min",
          lang: "EN · ES",
          title: "Qué esconde realmente un precio FOB",
          excerpt:
            "Tres cosas que la cotización en la PI no te muestra — y las dos preguntas que siempre deberías hacer antes de aceptar un número de una fábrica que no has visitado.",
        },
        {
          category: "Nota de campo",
          date: "Enero 2026",
          read: "6 min",
          lang: "EN",
          title: "Por qué Vietnam y Bangladesh ya no son intercambiables para outerwear técnico",
          excerpt:
            "Realidad de lead times, disponibilidad de tejido, y el cambio estructural lento que los compradores europeos están ignorando en la fase de cotización.",
        },
        {
          category: "Ensayo",
          date: "Diciembre 2025",
          read: "11 min",
          lang: "EN · ES",
          title: "La tercera opción entre ir directo y usar un agente de sourcing",
          excerpt:
            "Por qué los dos modelos dominantes para marcas europeas produciendo en Asia fallan de la misma forma — y qué hace diferente un equipo de compras externo.",
        },
        {
          category: "Whitepaper",
          gated: true,
          date: "Noviembre 2025",
          read: "PDF 24 páginas",
          lang: "EN",
          title: "Country-Product Matching Framework: una introducción",
          excerpt:
            "Los criterios estructurados que usamos para hacer matching entre una especificación de producto y un perfil de país y fábrica. Primer esbozo público del mecanismo de selección.",
        },
        {
          category: "Nota de campo",
          date: "Octubre 2025",
          read: "5 min",
          lang: "EN · ES",
          title: "Una mañana en un mill de softshell en las afueras de Ningbo",
          excerpt:
            "Notas sobre lo que ves en una auditoría de tejido técnico que nunca llega a la PI.",
        },
      ],
    },
    footer: {
      positioning: "Production partner en Asia para marcas B2B europeas. Da Nang, Vietnam.",
      nav: "Navegación",
      navItems: ["Inicio", "Propuesta de Valor", "Sobre nosotros", "Recursos"],
      legal: "Legal",
      legalItems: ["Privacidad", "Términos"],
      contact: "Contacto",
      email: "simon@buikaelements.com",
      address: "Da Nang, Vietnam",
      linkedin: "LinkedIn",
      book: "Reservar llamada de 30 min",
      copy: "© 2026 Buika Elements",
    },
    contactModal: {
      eyebrow: "Empieza la conversación",
      head: "Cuéntanos en qué estás trabajando.",
      sub: "Te decimos qué país, qué tipo de fábrica y cómo es un precio realista.",
      name: "Nombre",
      company: "Empresa",
      email: "Email",
      brief: "Qué estás produciendo o intentando resolver",
      briefPh:
        "Cuéntanos en qué estás trabajando. Te decimos qué país, qué tipo de fábrica y cómo es un precio realista.",
      country: "País de producción (opcional)",
      consent: "Acepto que Buika Elements me contacte sobre mi consulta.",
      submit: "Empieza la conversación",
      success: "Gracias. Simon te responderá en 24 horas.",
      close: "Cerrar",
    },
  },
};

export function getCopy(locale: Locale): Copy {
  return COPY[locale];
}
