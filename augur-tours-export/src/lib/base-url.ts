export const baseUrl = import.meta.env.PUBLIC_SITE_URL || "http://localhost:4321";

export function absoluteUrl(path = "/") {
  return new URL(path, baseUrl).toString();
}
