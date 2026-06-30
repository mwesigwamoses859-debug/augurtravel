import type { APIRoute } from "astro";
import bookings from "@/data/bookings-data.json";

export const GET: APIRoute = () => Response.json({ bookings });
export const POST: APIRoute = async ({ request }) => Response.json({ status: "received", booking: await request.json() });
