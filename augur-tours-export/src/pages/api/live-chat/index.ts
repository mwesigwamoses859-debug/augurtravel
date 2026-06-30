import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => Response.json({ status: "chat message received", payload: await request.json() });
