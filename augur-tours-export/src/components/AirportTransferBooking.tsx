export function AirportTransferBooking() {
  return (
    <form className="card">
      <h3>Kampala Airport Transfers</h3>
      <select><option>Entebbe International Airport</option><option>Kampala Central</option></select>
      <select><option>Sedan</option><option>SUV</option><option>Executive</option></select>
      <input placeholder="Flight number and arrival time" />
      <a className="button" href="https://wa.me/256779120189">Confirm via WhatsApp</a>
    </form>
  );
}
