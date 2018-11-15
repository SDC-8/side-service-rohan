const pg = require("pg");
const CONNECTION = require("CONNECTION");

const connection = CONNECTION;

const db = new pg.Client(connection);

db.connect();

db.query("CREATE SCHEMA IF NOT EXISTS sdc_agents;");

db.query(`CREATE TABLE IF NOT EXISTS sdc_agents.sdc_agents_tbl (
    id serial NOT NULL,
    name character varying(50),
    imgUrl character varying(50),
    rating integer,
    phone character varying(50),
    sales integer,
  );`);

db.query(
  `COPY sdc_houses.sdc_houses_tbl("id", "name", "imgUrl", "rating", "phone", "sales") FROM '/Users/nancynobis/Documents/projects/HackReactor/SDC/dataGenerationTest/testData2.csv' WITH (FORMAT CSV);`
);
