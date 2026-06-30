import payments from "@/data/payments-data.json";

export function PaymentOptions() {
  return (
    <section className="grid">
      {payments.map((payment) => (
        <article className="card" key={payment.method}>
          <h3>{payment.method}</h3>
          <p>{payment.providers.join(" | ")}</p>
          <strong>{payment.status}</strong>
        </article>
      ))}
    </section>
  );
}
