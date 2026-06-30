import type { APIRoute } from "astro";
import offers from "@/data/special-offers-config.json";

export const GET: APIRoute = () => Response.json({ offers });
