import type { APIRoute } from "astro";
import customers from "@/data/customers-config.json";

export const GET: APIRoute = () => Response.json({ customers });
export const POST: APIRoute = async ({ request }) => Response.json({ status: "customer saved", payload: await request.json() });
