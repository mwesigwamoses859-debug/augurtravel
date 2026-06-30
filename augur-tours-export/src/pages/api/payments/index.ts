import type { APIRoute } from "astro";
import payments from "@/data/payments-data.json";

export const GET: APIRoute = () => Response.json({ payments });
export const POST: APIRoute = async ({ request }) => Response.json({ status: "payment intent created", payload: await request.json() });
