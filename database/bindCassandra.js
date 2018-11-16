const ExpressCassandra = require("express-cassandra");
const faker = require("faker");

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

const HouseModel = models.loadSchema("House", {
  fields: {
    id: "int",
    price: "int",
    selldate: "text",
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

const saveToCassandra = async n => {
  for (let j = 0; j < n; j++) {
    let date = new Date(faker.date.past(10, "2010-05-23"));

    let home1 = new models.instance.House({
      id: j,
      price: Number(faker.random.number({ min: 100000, max: 1000000 })),
      selldate: `${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}`,
      beds: Number(faker.random.number({ min: 1, max: 6 })),
      baths: Number(faker.random.number({ min: 1, max: 6 })),
      sqft: Number(faker.random.number({ min: 450, max: 2000 })),
      streetaddress: `${faker.address.streetAddress()}`
    });

    home1.save({ if_not_exist: true }, err => {
      err ? console.error(err) : true;
    });

    // const doTheSave = async () => {
    //   home1.save({ if_not_exist: true }, err => {
    //     err ? console.error(err) : true;
    //   });
    // };
    // await doTheSave();
  }
};

const wrapper = async (n, m) => {
  console.time();
  for (let i = 0; i < m; i++) {
    await saveToCassandra(n);
  }
  console.timeEnd();
  console.log(":)");
};

// wrapper(2000, 5);
// node --max-old-space-size=8192 dataGeneration-Cassandra.js
// models.instance.House.findOne(
// models.instance.House.findOne(
//   {
//     id: 10
//   },
//   (err, homeOne) => {
//     if (err) {
//       console.error(err);
//       return;
//     } else {
//       console.log("here ya go _____________");
//       console.log(homeOne);
//     }
//   }
// );

// copy mykeyspace.“House” (id, saledate, beds, baths, sqft) from  /path/*.csv’;

// COPY mykeyspace.House (id,price,selldate,beds,baths,sqft,streetaddress) FROM 'cassandraData0.csv';
