const ExpressCassandra = require("express-cassandra");

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ["127.0.0.1"],
    protocolOptions: { port: 9042 },
    keyspace: "mykeyspace",
    queryOptions: { consistency: ExpressCassandra.consistencies.one }
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: "SimpleStrategy",
      replication_factor: 1
    },
    migration: "safe"
  }
});

/*
 id: "int",
    saledate: "date",
    beds: "int",
    baths: "int",
    sqft: "int",
    streetaddress: "varchar"
*/

const HouseModel = models.loadSchema("House", {
  fields: {
    id: "int",
    saledate: "text",
    beds: "int",
    baths: "int",
    sqft: "int",
    streetaddress: "text"
  },
  key: ["id"]
});

// MyModel or models.instance.Person can now be used as the model instance
console.log(models.instance.House === HouseModel);

// sync the schema definition with the cassandra database table
// if the schema has not changed, the callback will fire immediately
// otherwise express-cassandra will try to migrate the schema and fire the callback afterwards
HouseModel.syncDB(function(err, result) {
  if (err) throw err;
  // result == true if any database schema was updated
  // result == false if no schema change was detected in your models
});

const home1 = new models.instance.House({
  id: 2,
  saledate: "2017-05-05",
  beds: 5,
  baths: 4,
  sqft: 1250,
  streetaddress: "The City 100"
});

home1.save({ if_not_exist: true }, err => {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log("woohoo!");
  }
});

// models.instance.House.findOne(
models.instance.House.findOne(
  {
    id: 2
  },
  (err, homeOne) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log("here ya go _____________");
      console.log(homeOne);
    }
  }
);
