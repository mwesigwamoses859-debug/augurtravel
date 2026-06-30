import type { APIRoute } from "astro";

export const GET: APIRoute = () => Response.json({ blockedDates: ["2026-06-03", "2026-06-16"], status: "demo availability" });
