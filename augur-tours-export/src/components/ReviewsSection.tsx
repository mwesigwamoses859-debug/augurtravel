import reviews from "@/data/reviews-config.json";

export function ReviewsSection() {
  return <section className="grid">{reviews.map((review) => <article className="card" key={review.name}><h3>{review.name}</h3><p>{"★".repeat(review.rating)}</p><p>{review.review}</p></article>)}</section>;
}
