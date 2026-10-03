export type UTMFields = {
  websiteUrl: string;
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
};

export type UTMHistoryItem = UTMFields & {
  id: string;
  url: string;
  createdAt: string;
};

export const UTM_KEYS = [
  ["source", "utm_source", "Where the traffic comes from, such as google or newsletter."],
  ["medium", "utm_medium", "The marketing channel, such as cpc, email, or social."],
  ["campaign", "utm_campaign", "The campaign name, such as spring_sale or product_launch."],
  ["term", "utm_term", "Optional keyword or targeting term, often used for paid search."],
  ["content", "utm_content", "Optional creative or link variant, such as hero_button or blue_banner."],
] as const;

export function normalizeUrlInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return "";
  }
}

export function validateWebsiteUrl(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Enter the website URL you want to tag.";

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    const parsed = new URL(withProtocol);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "Use a valid HTTP or HTTPS website URL.";
    }

    if (!parsed.hostname || parsed.hostname.includes(" ")) {
      return "Enter a valid website address.";
    }

    return null;
  } catch {
    return "Enter a valid website URL, for example https://example.com/pricing.";
  }
}

export function buildUtmUrl(fields: UTMFields): string | null {
  const error = validateWebsiteUrl(fields.websiteUrl);
  if (error) return null;

  const baseUrl = normalizeUrlInput(fields.websiteUrl);
  if (!baseUrl) return null;

  const url = new URL(baseUrl);
  const values: Array<[string, string]> = [
    ["utm_source", fields.source],
    ["utm_medium", fields.medium],
    ["utm_campaign", fields.campaign],
    ["utm_term", fields.term],
    ["utm_content", fields.content],
  ];

  for (const [key, value] of values) {
    const cleanValue = value.trim();
    if (cleanValue) {
      // URLSearchParams handles correct percent-encoding for spaces,
      // unicode, punctuation, and other reserved characters.
      url.searchParams.set(key, cleanValue);
    }
  }

  return url.toString();
}

export const PRESETS: Record<
  string,
  Pick<UTMFields, "source" | "medium" | "campaign" | "term" | "content">
> = {
  "Google Ads": {
    source: "google",
    medium: "cpc",
    campaign: "",
    term: "",
    content: "",
  },
  "Meta Ads": {
    source: "meta",
    medium: "paid_social",
    campaign: "",
    term: "",
    content: "",
  },
  "LinkedIn Ads": {
    source: "linkedin",
    medium: "paid_social",
    campaign: "",
    term: "",
    content: "",
  },
  "TikTok Ads": {
    source: "tiktok",
    medium: "paid_social",
    campaign: "",
    term: "",
    content: "",
  },
  Email: {
    source: "email",
    medium: "email",
    campaign: "",
    term: "",
    content: "",
  },
  Newsletter: {
    source: "newsletter",
    medium: "email",
    campaign: "",
    term: "",
    content: "",
  },
  Influencer: {
    source: "influencer",
    medium: "referral",
    campaign: "",
    term: "",
    content: "",
  },
};

export const DEFAULT_FIELDS: UTMFields = {
  websiteUrl: "",
  source: "",
  medium: "",
  campaign: "",
  term: "",
  content: "",
};
