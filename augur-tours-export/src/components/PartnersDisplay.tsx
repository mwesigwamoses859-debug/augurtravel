import partners from "@/data/partners-config.json";

export function PartnersDisplay() {
  return <section className="grid">{partners.map((partner) => <article className="card" key={partner.name}><img src={partner.logo} alt={`${partner.name} logo`} /><h3>{partner.name}</h3></article>)}</section>;
}
