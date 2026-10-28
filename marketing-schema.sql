CREATE TABLE IF NOT EXISTS marketing_daily (
  day TEXT NOT NULL,
  event TEXT NOT NULL,
  service TEXT NOT NULL,
  source TEXT NOT NULL,
  total INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(day,event,service,source)
);

-- Private Cloudflare D1 console: daily interaction counts, excluding QA.
-- SELECT day,event,service,source,total FROM marketing_daily
-- WHERE source <> 'qa' ORDER BY day DESC,event,service,source;
-- Received enquiries live in the private Google Forms response register.
-- Quotations and confirmed bookings are maintained in the booking tracker.
