import hotels from "@/data/hotels-config.json";

export function HotelsList() {
  return (
    <section className="grid">
      {hotels.map((hotel) => (
        <article className="card" key={hotel.id}>
          <h3>{hotel.name}</h3>
          <p>{hotel.region}</p>
          <p>{hotel.amenities.join(" | ")}</p>
          <strong>{hotel.pricingModel}</strong>
        </article>
      ))}
    </section>
  );
}
