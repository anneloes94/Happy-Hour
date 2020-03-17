-- DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id),
  name VARCHAR(255) NOT NULL,
  start_time TIME,
  end_time TIME,
  address TEXT,
  lat INTEGER,
  lng INTEGER
);

