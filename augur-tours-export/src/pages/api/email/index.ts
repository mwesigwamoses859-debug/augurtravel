import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => Response.json({ status: "email queued", provider: "Nodemailer", payload: await request.json() });
