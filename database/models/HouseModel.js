module.exports = {
  fields: {
    id: "int",
    saledate: "date",
    beds: "int",
    baths: "int",
    sqft: "int",
    streetaddress: "varchar"
  },
  key: ["name"]
};

/*

id serial NOT NULL,
    price integer,
    saledate date,
    beds integer,
    baths integer,
    sqft integer,
    streetaddress character varying(50)

*/
