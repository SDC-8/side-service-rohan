CREATE TABLE agents (
  id serial NOT NULL,
  full_name character varying(50),
  imgUrl character varying(50),
  rating integer,
  phone date,
  price integer,
)

CREATE TABLE houses_two.houses_tbl_two (
  id serial NOT NULL,
  price integer,
  saleDate date,
  beds integer,
  baths integer,
  sqft integer,
  streetAddress character varying(50)
);



COPY houses(id,price,saleDate,beds,baths,sqft,streetAddress) 
FROM '/Users/nancynobis/Documents/projects/HackReactor/SDC/dataGenerationTest/testData1.csv' DELIMITER ',' CSV HEADER;

INSERT INTO houses (id,price,saleDate,beds,baths,sqft,streetAddress)
VALUES (234567, Tue Nov 13 2018 19:19:34 GMT-0500, 3, 4, 1250, '320 hopkins green rd');

CREATE TABLE numbers (
  id serial NOT NULL,
  num integer
);

INSERT INTO houses_two.houses_tbl_two VALUES (1, 55555, '1999-01-08', 3, 2, 1200, 'the street');



-- WORKING SCRIPT AND FORMAT FOR SEEDING DB!!
-- 1,227376,1999-1-08,6,2,1222,'the street'


-- COPY houses_two.houses_tbl_two("id", "price", "saledate", "beds", "baths", "sqft", "streetaddress") FROM '/Users/nancynobis/Documents/projects/HackReactor/SDC/dataGenerationTest/testData1.csv' DELIMITER ',' CSV; 








CREATE SCHEMA houses;

CREATE TABLE houses.houses_tbl (
  id serial NOT NULL,
  price integer,
  saledate date,
  beds integer,
  baths integer,
  sqft integer,
  streetaddress character varying(50)
);

COPY houses.houses_tbl("id", "price", "saledate", "beds", "baths", "sqft", "streetaddress") FROM '/Users/nancynobis/Documents/projects/HackReactor/SDC/dataGenerationTest/testData1.csv' DELIMITER ',' CSV; 


CREATE USER rohan WITH SUPERUSER PASSWORD '09101990';