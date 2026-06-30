import type { APIRoute } from "astro";
import reviews from "@/data/reviews-config.json";

export const GET: APIRoute = () => Response.json({ reviews });
