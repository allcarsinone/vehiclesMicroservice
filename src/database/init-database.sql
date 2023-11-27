CREATE TABLE gastypes (
    gastypeid SERIAL PRIMARY KEY,
    gastypename VARCHAR(100)
);

CREATE TABLE brands (
    brandid SERIAL PRIMARY KEY,
    brandname VARCHAR(100)
);

CREATE TABLE vehicles (
    vehicleid SERIAL PRIMARY KEY,
    standid INTEGER,
    brandid INTEGER,
    gastypeid INTEGER,
    model VARCHAR(60),
    year INTEGER,
    mileage FLOAT,
    price FLOAT,
    availability BOOLEAN,
    description VARCHAR(250),
    gastypeid REFERENCES gastypes(gastypeid),
    brandid REFERENCES brands(brandid)
);