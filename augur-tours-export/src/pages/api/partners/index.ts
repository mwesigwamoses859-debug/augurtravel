import type { APIRoute } from "astro";
import partners from "@/data/partners-config.json";

export const GET: APIRoute = () => Response.json({ partners });
export const POST: APIRoute = async ({ request }) => Response.json({ status: "partner updated", payload: await request.json() });
