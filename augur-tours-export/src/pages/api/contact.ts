import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => Response.json({ status: "contact message queued", payload: await request.json() });
