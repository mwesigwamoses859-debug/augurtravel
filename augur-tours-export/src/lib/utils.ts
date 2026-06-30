import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const bookingRequestSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(7),
  service: z.string().min(2),
  message: z.string().optional()
});

export function whatsappLink(message: string, phone = "256779120189") {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
