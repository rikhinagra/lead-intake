/**
 * Currently the Vercel deployment URL, since a custom domain isn't
 * connected. Everything below (Open Graph tags, robots.txt, canonical
 * URLs) is generated from this one value, so update it here if the
 * deployment URL ever changes.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://lead-intake-dun.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Lead Intake";

export const SITE_TITLE = "New Lead";

export const SITE_DESCRIPTION = "Capture essential case details.";

export const BRAND_COLORS = {
  ink: "#101828",
  accent: "#0b0c0e",
  bg: "#f9fafb",
  border: "#e4e7ec",
} as const;
