import hotels from "@/data/hotels-config.json";

export function HotelAdmin() {
  return (
    <section className="card">
      <h3>Hotel Admin</h3>
      {hotels.map((hotel) => <p key={hotel.id}>{hotel.name} - {hotel.status}</p>)}
    </section>
  );
}
