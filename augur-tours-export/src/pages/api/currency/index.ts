import type { APIRoute } from "astro";

export const GET: APIRoute = () => Response.json({ base: "USD", rates: { UGX: 3850, EUR: 0.92, GBP: 0.79, KES: 129 } });
