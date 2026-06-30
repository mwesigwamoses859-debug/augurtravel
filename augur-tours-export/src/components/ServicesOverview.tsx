import { FeatureShell } from "./FeatureShell";

export function ServicesOverview() {
  return (
    <section className="grid">
      <FeatureShell title="Hotel Booking System" body="Browse hotels, details, amenities, room types, quote requests, admin, and commission protection." href="/hotel-bookings" />
      <FeatureShell title="Airport Transfer System" body="Entebbe to Kampala, multi-destination support, vehicle selection, and fare calculation." href="/airport-transfers" />
      <FeatureShell title="Car Hire System" body="Outsourced partner workflow, quote request forms, WhatsApp integration, and admin tracking." href="/car-hire" />
    </section>
  );
}
