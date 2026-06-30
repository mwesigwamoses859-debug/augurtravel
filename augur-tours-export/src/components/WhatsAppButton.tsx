export function WhatsAppButton({ message = "Hello Augur Tours" }: { message?: string }) {
  return <a className="button" href={`https://wa.me/256779120189?text=${encodeURIComponent(message)}`}>WhatsApp</a>;
}
