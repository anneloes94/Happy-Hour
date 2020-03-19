DROP TABLE IF EXISTS restaurants CASCADE;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id),
  name VARCHAR(255) NOT NULL,
  date_available integer[],
  start_time TIME,
  end_time TIME,
  address TEXT,
  lat DECIMAL(8,6),
  lng DECIMAL(8,6)
);

