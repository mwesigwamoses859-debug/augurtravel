import partners from "@/data/partners-config.json";

export function PartnersAdmin() {
  return (
    <section className="grid">
      {partners.map((partner) => <article className="card" key={partner.name}><h3>{partner.name}</h3><p>{partner.status}</p></article>)}
    </section>
  );
}
