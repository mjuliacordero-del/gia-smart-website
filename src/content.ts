/**
 * All copy is sourced from the July 22, 2026 She Sells Premium Masterclass
 * Workbook (the sole visual + verbal authority) and Gia Smart's brand voice.
 * Vocabulary is deliberate: Premium Enrollment, recalibration, discernment,
 * dignified yes, container, frequency, VIP Connect. No hustle-funnel language.
 */

export const nav = [
  { label: "The Recalibration", id: "recalibration" },
  { label: "The Five Masteries", id: "masteries" },
  { label: "The Language", id: "language" },
  { label: "Enrollment", id: "enroll" },
];

export const hero = {
  eyebrow: "Premium Enrollment Mastery",
  titleLead: "You were built to",
  titleAccent: "lead the room",
  titleTail: "not chase it.",
  sub: "You are not behind. You are being perfectly positioned for the wealth, leadership, and legacy you were always called to create — and premium buyers are waiting to say a dignified yes.",
  ctaPrimary: { label: "Step into the recalibration", id: "enroll" },
  ctaSecondary: { label: "See who you become", id: "masteries" },
  marquee: [
    "Iconic Faith",
    "Presence Mastery",
    "Communication Mastery",
    "Invitation Mastery",
    "Enrollment Mastery",
  ],
};

export const recalibration = {
  chapter: "Gia Smart",
  eyebrow: "Where it begins",
  lead: "You are not behind.",
  body:
    "You are, in fact, being perfectly positioned for your highest impact — and for the kind of wealth, leadership, and legacy you have always felt called to create.",
  quote:
    "This is not only about what you say on a sales call. It is about who you become as a leader. It is a recalibration.",
  attribution: "Gia Smart",
};

export const comparison = {
  eyebrow: "Conventional sales versus Premium Enrollment",
  title: "You cannot use one framework to accomplish the other.",
  columns: {
    old: {
      kicker: "Old foundation",
      title: "Conventional sales is built for transactions.",
      note: "Organized around pressure, resistance, and the distance between where someone is and where they want to be.",
    },
    new: {
      kicker: "The recalibration",
      title: "Premium Enrollment is built for embodiment and one's highest transformation.",
      note: "Organized around the client's brilliance, desire, and capacity — present the whole time.",
    },
  },
  shifts: [
    {
      from: "Gap",
      to: "Leadership",
      detail:
        "Conventional sales measures the distance to close. Premium Enrollment holds leadership so the client sees the guide into their transformation.",
    },
    {
      from: "Pain",
      to: "Truth",
      detail:
        "Pain can be named clearly — but it is never the pressure point that manufactures the decision.",
    },
    {
      from: "More",
      to: "Already",
      detail:
        "You do not ask her to become more. You help her recognize the version of herself she has been reaching for was present all along.",
    },
  ],
};

export type Mastery = {
  n: string;
  name: string;
  subtitle: string;
  essence: string;
  line: string;
  motif: string;
};

export const masteries: Mastery[] = [
  {
    n: "01",
    name: "Iconic Faith",
    subtitle: "The foundational energetics",
    essence:
      "Radical certainty before proof — entering the call from gratitude, calm, and conviction while holding faith in your own premium identity and the client's highest identity.",
    line: "It is not hoping they say yes. It is becoming the woman who already knows.",
    motif: "See the yes before proof.",
  },
  {
    n: "02",
    name: "Presence Mastery",
    subtitle: "Iconic Faith embodied",
    essence:
      "What the client feels from you before your words fully land. It creates safety, trust, and grounded leadership — steady when fear, hesitation, or scarcity enter the room.",
    line: "You are walking her, with total ease, into a decision already made.",
    motif: "The work before the work.",
  },
  {
    n: "03",
    name: "Communication Mastery",
    subtitle: "The bridge between energy & language",
    essence:
      "The discipline of choosing precise, powerful words that carry truth, poise, and premium leadership — creating clarity and expansion instead of pressure or proving.",
    line: "Her voice is her vault.",
    motif: "Words carry frequency.",
  },
  {
    n: "04",
    name: "Invitation Mastery",
    subtitle: "Access & higher identity",
    essence:
      "The art of guiding the client into their own yes — a premium, considered experience that holds love and standards at once, discerning who is truly aligned for the container.",
    line: "Every invitation you extend is an act of love. Lead it that way.",
    motif: "Not everyone is automatically invited.",
  },
  {
    n: "05",
    name: "Enrollment Mastery",
    subtitle: "The art of mastering the ask",
    essence:
      "Guiding the final decision from alignment into commitment, so the investment becomes the activation of the transformation. You are inviting someone into investing in themselves.",
    line: "Steward the yes cleanly, so the investment becomes her highest activation.",
    motif: "Enroll — never close.",
  },
];

export const language = {
  eyebrow: "Communication Mastery",
  title: "Precision vocabulary",
  intro:
    "The words you choose carry frequency. They can create pressure and transaction — or trust, clarity, and expansion. Recalibrate the language, and the room recalibrates with it.",
  pairs: [
    { use: "Invest", instead: "buy", note: "She is backing her own expansion — not purchasing a thing." },
    { use: "Enroll", instead: "close", note: "Guide someone into their own vision, not over a finish line." },
    { use: "Invite", instead: "ask to be chosen", note: "Leadership posture — an active guiding process, not please-pick-me energy." },
    { use: "Curiosity", instead: "proving", note: "Keeps the moment about connection and discernment, not performance." },
    { use: "VIP Connect", instead: "sales call", note: "Elevated, mutual, curated — never transactional." },
    { use: "Premium buyers", instead: "leads", note: "The need is a system that invites premium buyers with precision." },
  ],
};

export const recognition = {
  eyebrow: "Where is your recalibration?",
  title: "None of this is because you lack the skill.",
  intro:
    "In a decade with the highest-level women, the same four things quietly hold extraordinary women back. Which one feels most familiar right now?",
  items: [
    {
      k: "Your offer is unclear",
      d: "No matter how talented you are, you cannot yet articulate what you do in a way that commands the price you deserve.",
    },
    {
      k: "Your enrollment conversations collapse",
      d: "Not because the client isn't ready — but because something in the room shifts, and you don't yet know how to hold it.",
    },
    {
      k: "Your identity hasn't caught up with your vision",
      d: "You are trying to sell at a level you haven't yet fully claimed inside yourself.",
    },
    {
      k: "Your positioning is misaligned",
      d: "You are attracting clients who aren't ready for the transformation you offer — or attracting no one at all.",
    },
  ],
  resolve:
    "None of these are permanent. Every one is a recalibration I have led women through — and the other side is always the same: pure alignment. An offer so elevated, so distinctly yours, that selling it no longer feels like selling at all.",
};

export const future = {
  eyebrow: "The other side",
  title: "What becomes true once you recalibrate",
  cards: [
    {
      t: "More premium clients",
      d: "Clients say yes from self-trust, vision, and genuine desire. They don't feel pushed — they feel guided, seen, and invited into the transformation they already want.",
    },
    {
      t: "Higher-caliber containers",
      d: "The room becomes shaped by standards, discernment, and divine alignment. You stop trying to close everyone and begin recognizing who is truly aligned for the work.",
    },
    {
      t: "Sustainable, sacred growth",
      d: "Fewer misaligned clients. Cleaner yeses. Stronger retention and trust — a sales process that protects your nervous system and honors your calling.",
    },
  ],
};

export const authority = {
  eyebrow: "Your guide",
  name: "Gia Smart",
  role: "Award-winning Luxury Business Consultant & mentor to high-level women.",
  body:
    "Recently honored with the Evergreen Awards “Best Luxury Business Consultant in the U.S.” and published in Women’s Insider. My gift is discernment — I can see, in seconds, exactly where a woman’s communication collapses her authority, and how to recalibrate it so premium buyers move with clarity and conviction.",
  stats: [
    { value: "10+", label: "Years training premium sales teams" },
    { value: "10,000+", label: "Hours of premium consulting" },
    { value: "$25M+", label: "In revenue contributed" },
  ],
  quote:
    "Premium Enrollment Mastery creates the conditions for a dignified, congruent, love-led “yes.”",
};

export const enroll = {
  kicker: "Your yes",
  lead: "She is who you already are.",
  body:
    "You are not a woman learning how to sell. You are a woman remembering how to lead. This masterclass is not giving her to you — it is giving her back to you.",
  eyebrow: "Your invitation",
  title: "Step into Premium Enrollment Mastery",
  formBody:
    "For women building premium brands and white-glove containers — not another hustle funnel. What follows is a clean next step, chosen with discernment on both sides.",
  cta: "Yes — call me higher",
  success: "Received. Watch for a clean next step — an invitation, never a pressure sequence.",
  reassure: "White-glove. No pressure sequence. Discernment on both sides.",
};

export const footer = {
  wordmark: "She Sells Premium",
  tm: "™",
  line: "Gia Smart · Premium Enrollment Mastery",
  authority: "© 2026 She Sells Premium™ · Premium Enrollment Mastery",
};
