import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => Response.json({ status: "payment webhook received", payload: await request.json() });
