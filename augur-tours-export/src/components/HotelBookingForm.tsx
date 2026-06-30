import { whatsappLink } from "@/lib/utils";

export function HotelBookingForm() {
  return (
    <form className="card">
      <h3>Request a hotel quote</h3>
      <input placeholder="Name" />
      <input placeholder="Travel dates" />
      <input placeholder="Rooms and guests" />
      <textarea placeholder="Preferences" />
      <a className="button" href={whatsappLink("Hello Augur Tours, I would like a hotel quote.")}>Request via WhatsApp</a>
    </form>
  );
}
