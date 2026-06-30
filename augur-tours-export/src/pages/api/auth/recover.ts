import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => Response.json({ status: "password recovery requested", payload: await request.json() });
