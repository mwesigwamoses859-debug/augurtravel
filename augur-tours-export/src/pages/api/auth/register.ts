import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => Response.json({ status: "registration requested", payload: await request.json() });
