import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => Response.json({ status: "sms queued", provider: "Africa's Talking", payload: await request.json() });
