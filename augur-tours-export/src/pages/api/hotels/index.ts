import type { APIRoute } from "astro";
import hotels from "@/data/hotels-config.json";

export const GET: APIRoute = () => Response.json({ hotels });
export const POST: APIRoute = async ({ request }) => Response.json({ status: "hotel quote requested", payload: await request.json() });
