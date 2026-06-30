import type { APIRoute } from "astro";

export const GET: APIRoute = () => Response.json({ provider: "Google Maps API", status: "pending API key" });
