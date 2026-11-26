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
  why: Array<{ label: string; body: string; tag?: string }>;
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
    nav: { home: "Home", services: "Services", about: "About", resources: "Resources", contact: "Contact" },
    home: {
      heroEyebrow: "Sourcing agent · Asia",
      heroHeadline: ["Your sourcing agent in Asia.", "From the right factory to the final shipment."],
      heroSub: "European workwear and PPE brands work with us to develop products, find the right factory, keep production on track and meet EU requirements — without building a team in Asia. Run by a former Head of Purchasing: we sit on your side of the table.",
      heroCta: "Let's talk",
      credibility: ["China, Vietnam, Bangladesh, Myanmar", "Workwear · PPE", "EN ISO · CE"],
      positioningEyebrow: "What Buika Elements is",
      positioningHead: "Yes, we're a sourcing agent. Here's what that means with us.",
      positioningBody: ["Most brands have worked with an agent who forwarded emails and disappeared when a shipment went wrong. We work differently.", "16 years in Asia, including running purchasing for a European workwear brand — we know what a FOB price hides and when a lead time is real. Based in Da Nang, Vietnam, close to the factories. And how we work and how we're paid is agreed before the first PO."],
      contrastEyebrow: "The difference in practice",
      contrast: {
        left: {
          label: "A typical agent",
          lines: [
            "Forwards emails.",
            "Disappears when a shipment goes wrong.",
            "Vague about how they're paid."
          ]
        },
        right: {
          label: "Buika Elements",
          lines: [
            "Thinks like a buyer.",
            "Based in Asia, close to the factories.",
            "Clear terms from day one."
          ]
        }
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
      whyEyebrow: "What we cover",
      whyHead: "Five areas. Start where you need us.",
      why: [
        {
          label: "Develop",
          body: "ODM and ready-made catalogue (400+ new items per season), white label."
        },
        {
          label: "Source",
          body: "Country and factory selection, costing, negotiation."
        },
        {
          label: "Produce",
          body: "PO follow-up, lead-time control, QC in the factory."
        },
        {
          label: "Comply",
          body: "EN ISO / CE certification paths."
        },
        {
          label: "Consulting",
          body: "Sourcing strategy and production relocation, supply chain diagnosis, EU regulation advisory."
        },
        {
          tag: "Your scope",
          label: "One area or all five — you choose.",
          body: "Consulting is project-based: a defined question, a defined deliverable, a fixed fee."
        }
      ],
      statement: "Transparency is not a risk — it's what makes the relationship work.",
      bottomCta: {
        head: "Tell us what you're working on.",
        body: "We'll tell you honestly whether we can help — and how.",
        cta: "Book a 30-min call"
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
      eyebrow: "Services",
      head: "Five areas. Scoped to your situation.",
      sub: "Every engagement starts with a conversation about your product, volumes and timeline — not a fixed package. Use one area or all five.",
      list: [
        {
          situation: "For brands entering a new category or widening their range",
          title: "Develop",
          intro: "",
          bullets: [
            "Trend access: seasonal catalogues from our supplier network for range planning",
            "ODM: catalogue products adapted to your spec and market",
            "White label: supplier-developed products under your label, minimal changes"
          ],
          outcome: "400+ new items per season to build from, without your own design infrastructure."
        },
        {
          situation: "For brands starting in Asia, adding a factory or moving production",
          title: "Source",
          intro: "",
          bullets: [
            "Product, volume and compliance analysis before any recommendation",
            "Country and factory selection from our network",
            "Costing, FOB analysis and negotiation",
            "Technical brief and onboarding until first sample approval"
          ],
          outcome: "The right factory for your product, at a price you understand."
        },
        {
          situation: "For brands with orders running in Asia — ongoing or a single PO",
          title: "Produce",
          intro: "",
          bullets: [
            "PO follow-up and lead-time control",
            "QC in the factory",
            "Delay diagnosis and recovery, quality escalation at factory level",
            "Can support a single order with a factory you already manage"
          ],
          outcome: "Orders that arrive as agreed. We start within 48 hours of your brief."
        },
        {
          situation: "For brands selling certified workwear and PPE in Europe",
          title: "Comply",
          intro: "",
          bullets: [
            "EN ISO / CE certification paths with the factory",
            "Compliance gap check before shipment"
          ],
          outcome: "Products that meet EU requirements before they leave the factory."
        },
        {
          situation: "For companies deciding whether, where and how to produce in Asia",
          title: "Consulting",
          intro: "",
          bullets: [
            "Manufacturing feasibility study: country recommendation with rationale, factory profile, cost and lead-time benchmarks, phased roadmap",
            "Production relocation: planning a move between countries or factories",
            "Supply chain diagnosis: where your current setup loses money or time",
            "EU regulation advisory: EN certifications, CSRD and CSDDD — and what they mean for your suppliers"
          ],
          outcome: "A written report and a clear decision, delivered in 2–3 weeks. Project-based, fixed fee."
        },
        {
          situation: "Want all of it?",
          title: "Full scope",
          intro: "We act as your sourcing team in Asia — from development to delivery — with a seasonal review of performance, prices and country fit.",
          bullets: [],
          outcome: "The continuity of a Head of Asia Sourcing, without the fixed cost of a hire."
        }
      ],
      bottomCta: {
        head: "Not sure where to start?",
        body: "Tell us what you're working on. We'll tell you which area fits — or if none does.",
        cta: "Book a call"
      }
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
      filters: ["All", "Blogposts", "Whitepapers", "Field notes"],
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
      positioning: "Sourcing agent in Asia for European workwear and PPE brands. Da Nang, Vietnam.",
      nav: "Navigation",
      navItems: ["Home", "Services", "About", "Resources"],
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
      services: "Servicios",
      about: "Sobre nosotros",
      resources: "Recursos",
      contact: "Contacto",
    },
    home: {
      heroEyebrow: "Agente de sourcing · Asia",
      heroHeadline: ["Tu agente de sourcing en Asia.", "De la fábrica adecuada al envío final."],
      heroSub: "Las marcas europeas de workwear y EPIs trabajan con nosotros para desarrollar producto, encontrar la fábrica adecuada, mantener la producción en plazo y cumplir los requisitos de la UE — sin montar un equipo en Asia. Lo dirige un ex Director de Compras: estamos de tu lado de la mesa.",
      heroCta: "Hablemos",
      credibility: ["China, Vietnam, Bangladesh, Myanmar", "Workwear · EPIs", "EN ISO · CE"],
      positioningEyebrow: "Qué es Buika Elements",
      positioningHead: "Sí, somos un agente de sourcing. Esto es lo que significa con nosotros.",
      positioningBody: ["Casi todas las marcas han trabajado alguna vez con un agente que reenviaba emails y desaparecía cuando un envío salía mal. Nosotros trabajamos de otra forma.", "16 años en Asia, incluida la dirección de compras de una marca europea de workwear — sabemos lo que esconde un precio FOB y cuándo un plazo es real. Estamos en Da Nang, Vietnam, cerca de las fábricas. Y cómo trabajamos y cómo cobramos se acuerda antes del primer pedido."],
      contrastEyebrow: "La diferencia en la práctica",
      contrast: {
        left: {
          label: "Un agente típico",
          lines: [
            "Reenvía emails.",
            "Desaparece cuando un envío sale mal.",
            "Poco claro sobre cómo cobra."
          ]
        },
        right: {
          label: "Buika Elements",
          lines: [
            "Piensa como un comprador.",
            "Está en Asia, cerca de las fábricas.",
            "Condiciones claras desde el primer día."
          ]
        }
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
      whyEyebrow: "Qué cubrimos",
      whyHead: "Cinco áreas. Empieza por donde nos necesites.",
      why: [
        {
          label: "Desarrollo",
          body: "ODM y catálogo listo (400+ referencias nuevas por temporada), marca blanca."
        },
        {
          label: "Sourcing",
          body: "Selección de país y fábrica, escandallo, negociación."
        },
        {
          label: "Producción",
          body: "Seguimiento de pedidos, control de plazos, QC en fábrica."
        },
        {
          label: "Normativa",
          body: "Rutas de certificación EN ISO / CE."
        },
        {
          label: "Consultoría",
          body: "Estrategia de sourcing y relocalización de producción, diagnóstico de la cadena de suministro, asesoría en normativa UE."
        },
        {
          tag: "Tu alcance",
          label: "Un área o las cinco — tú eliges.",
          body: "La consultoría se trabaja por proyecto: una pregunta definida, un entregable definido, un precio cerrado."
        }
      ],
      statement: "La transparencia no es un riesgo — es lo que hace que la relación funcione.",
      bottomCta: {
        head: "Cuéntanos en qué estás trabajando.",
        body: "Te diremos con honestidad si podemos ayudarte — y cómo.",
        cta: "Reserva una llamada de 30 min"
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
      eyebrow: "Servicios",
      head: "Cinco áreas. Ajustadas a tu situación.",
      sub: "Cada proyecto empieza con una conversación sobre tu producto, volúmenes y plazos — no con un paquete cerrado. Usa un área o las cinco.",
      list: [
        {
          situation: "Para marcas que entran en una categoría nueva o amplían su gama",
          title: "Desarrollo",
          intro: "",
          bullets: [
            "Acceso a tendencias: catálogos de temporada de nuestra red de proveedores para planificar la gama",
            "ODM: productos de catálogo adaptados a tu especificación y mercado",
            "Marca blanca: productos desarrollados por el proveedor con tu marca, con cambios mínimos"
          ],
          outcome: "Más de 400 referencias nuevas por temporada para construir tu gama, sin infraestructura de diseño propia."
        },
        {
          situation: "Para marcas que empiezan en Asia, añaden una fábrica o trasladan producción",
          title: "Sourcing",
          intro: "",
          bullets: [
            "Análisis de producto, volumen y compliance antes de cualquier recomendación",
            "Selección de país y fábrica dentro de nuestra red",
            "Escandallo, análisis del FOB y negociación",
            "Brief técnico y onboarding hasta la aprobación de la primera muestra"
          ],
          outcome: "La fábrica adecuada para tu producto, a un precio que entiendes."
        },
        {
          situation: "Para marcas con pedidos en marcha en Asia — continuos o un solo pedido",
          title: "Producción",
          intro: "",
          bullets: [
            "Seguimiento de pedidos y control de plazos",
            "QC en fábrica",
            "Diagnóstico y recuperación de retrasos, escalado de calidad a nivel de fábrica",
            "Podemos apoyar un solo pedido con una fábrica que ya gestionas tú"
          ],
          outcome: "Pedidos que llegan como se acordó. Empezamos en 48 horas desde tu brief."
        },
        {
          situation: "Para marcas que venden workwear y EPIs certificados en Europa",
          title: "Normativa",
          intro: "",
          bullets: [
            "Rutas de certificación EN ISO / CE con la fábrica",
            "Revisión de gaps de compliance antes del envío"
          ],
          outcome: "Productos que cumplen los requisitos de la UE antes de salir de la fábrica."
        },
        {
          situation: "Para empresas que deciden si producir en Asia, dónde y cómo",
          title: "Consultoría",
          intro: "",
          bullets: [
            "Estudio de viabilidad de fabricación: recomendación de país razonada, perfil de fábrica, benchmarks de coste y plazo, hoja de ruta por fases",
            "Relocalización de producción: planificar un cambio de país o de fábrica",
            "Diagnóstico de la cadena de suministro: dónde pierde dinero o tiempo tu modelo actual",
            "Asesoría en normativa UE: certificaciones EN, CSRD y CSDDD — y qué suponen para tus proveedores"
          ],
          outcome: "Un informe escrito y una decisión clara, en 2–3 semanas. Por proyecto, a precio cerrado."
        },
        {
          situation: "¿Lo quieres todo?",
          title: "Alcance completo",
          intro: "Actuamos como tu equipo de sourcing en Asia — del desarrollo a la entrega — con una revisión cada temporada de rendimiento, precios y encaje de país.",
          bullets: [],
          outcome: "La continuidad de un Director de Compras en Asia, sin el coste fijo de contratarlo."
        }
      ],
      bottomCta: {
        head: "¿No sabes por dónde empezar?",
        body: "Cuéntanos en qué estás trabajando. Te diremos qué área encaja — o si no encaja ninguna.",
        cta: "Reserva una llamada"
      }
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
      filters: ["Todo", "Blogposts", "Whitepapers", "Notas de campo"],
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
      positioning: "Agente de sourcing en Asia para marcas europeas de workwear y EPIs. Da Nang, Vietnam.",
      nav: "Navegación",
      navItems: ["Inicio", "Servicios", "Sobre nosotros", "Recursos"],
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
