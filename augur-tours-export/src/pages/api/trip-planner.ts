import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => Response.json({ status: "itinerary draft created", payload: await request.json() });
