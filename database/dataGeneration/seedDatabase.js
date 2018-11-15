const pg = require("pg");
const CONNECTION = require("CONNECTION");

const connection = CONNECTION;

const db = new pg.Client(connection);

db.connect();

db.query("CREATE SCHEMA IF NOT EXISTS sdc_houses;");

db.query(`CREATE TABLE IF NOT EXISTS sdc_houses.sdc_houses_tbl (
    id serial NOT NULL,
    price integer,
    saledate date,
    beds integer,
    baths integer,
    sqft integer,
    streetaddress character varying(50)
  );`);

// db.query(
//   `COPY houses.houses_tbl("id", "price", "saledate", "beds", "baths", "sqft", "streetaddress") FROM '/Users/nancynobis/Documents/projects/HackReactor/SDC/dataGenerationTest/testData1.csv' DELIMITER ',' CSV; `
// );

// db.query("SELECT * FROM sdc_houses.sdc_houses_tbl", (err, res) => {
//   console.log(err, res);
//   db.end();
// });

db.query(
  `COPY sdc_houses.sdc_houses_tbl("id", "price", "saledate", "beds", "baths", "sqft", "streetaddress") FROM '/Users/nancynobis/Documents/projects/HackReactor/SDC/dataGenerationTest/testData1.csv' WITH (FORMAT CSV);`
);
