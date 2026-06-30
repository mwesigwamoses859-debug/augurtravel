import type { APIRoute } from "astro";

export const GET: APIRoute = () => Response.json({ requests: [] });
export const POST: APIRoute = async ({ request }) => Response.json({ status: "car hire request received", payload: await request.json() });
