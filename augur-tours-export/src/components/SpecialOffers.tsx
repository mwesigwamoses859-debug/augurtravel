import offers from "@/data/special-offers-config.json";

export function SpecialOffers() {
  return <section className="grid">{offers.map((offer) => <article className="card" key={offer.title}><h3>{offer.title}</h3><p>{offer.description}</p><strong>{offer.status}</strong></article>)}</section>;
}
