import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => Response.json({ status: "login requested", payload: await request.json() });
