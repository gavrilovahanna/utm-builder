export const SITE_NAME = "UTM Builder";
export const SITE_URL =
  process.env.SITE_URL?.replace(/\/$/, "") || "https://utm-builder.example.com";
export const CONTACT_EMAIL = "hello@utm-builder.example.com";

export const navigation = [
  { href: "/", label: "UTM Builder" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
] as const;
