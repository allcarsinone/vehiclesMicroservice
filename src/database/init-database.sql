CREATE TABLE gastypes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    standid INTEGER,
    model VARCHAR(60),
    year INTEGER,
    mileage FLOAT,
    price FLOAT,
    availability BOOLEAN,
    description VARCHAR(250),
    gastypeid INTEGER,
    brandid INTEGER
);