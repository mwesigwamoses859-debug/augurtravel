import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => Response.json({ status: "subscribed", payload: await request.json() });
