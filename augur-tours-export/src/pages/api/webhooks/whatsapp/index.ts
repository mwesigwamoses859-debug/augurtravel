import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => Response.json({ status: "whatsapp webhook received", payload: await request.json() });
