import type { APIRoute } from "astro";
import gallery from "@/data/gallery-config.json";

export const GET: APIRoute = () => Response.json({ gallery });
export const POST: APIRoute = async ({ request }) => Response.json({ status: "gallery upload queued", payload: await request.json() });
