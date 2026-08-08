export type DomainId =
  | "identity"
  | "education"
  | "experience"
  | "businessManagement"
  | "accountingFinance"
  | "aiTechnology"
  | "projects"
  | "writing"
  | "career"
  | "skills"
  | "certifications"
  | "languages"
  | "interests"
  | "recommendations"
  | "contact";

export type FactTag =
  | "summary" | "where" | "when" | "why" | "detail" | "list" | "skills" | "outcome";

export type Fact = {
  tag: FactTag;
  // "fact" = verifiable from source data. "interpretation" = a reasonable
  // reading of the facts, not itself a documented fact — the composer
  // phrases these differently so the bot never states an inference as if
  // it were a verified detail.
  type: "fact" | "interpretation";
  text: string;
};

export type EntityItem = {
  id: string;
  label: string;
  aliases: string[];
  start: string; // month-year, for chronological queries
  end: string;
  facts: Fact[];
  relatedArticleSlugs?: string[];
};

export type DomainKnowledge = {
  id: DomainId;
  label: string;
  keywords: string[];
  facts: Fact[];
  items?: EntityItem[];
  source?: { label: string; href: string };
};

export type Turn = { role: "user" | "assistant"; text: string };

export type SubAngle = "where" | "when" | "why" | "who" | "detail" | null;

export type ArticleMatch = {
  slug: string;
  title: string;
  dek: string;
  category: string;
  href: string;
  excerpt: string;
};

export type AnswerLength = "short" | "normal" | "detailed";

export type Classification = {
  domain: DomainId | null;
  secondDomain: DomainId | null;
  combineDomains: boolean;
  entity: EntityItem | null;
  subAngle: SubAngle;
  length: AnswerLength;
  isGreeting: boolean;
  isThanks: boolean;
  isCapability: boolean;
  isExpand: boolean;
  isExplainSimple: boolean;
  isFollowUp: boolean;
  unresolvedTopic: string | null;
  articleIntent: "search" | "explain" | "synthesize" | null;
  articleQueryTerms: string[];
  temporal: { direction: "before" | "after"; anchor: string | null } | null;
  isRelevanceFollowUp: boolean;
  contextArticleSlug: string | null;
};

export type AskResult = {
  answer: string;
  grounded: boolean;
  sources: string[];
  links: { label: string; href: string }[];
};
