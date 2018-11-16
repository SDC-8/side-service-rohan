const fs = require("fs");
const csv = require("fast-csv");
const faker = require("faker");
// const stream = fs.createWriteStream("testData1.csv");
let headers = [
  "id",
  "price",
  "sellDate",
  "beds",
  "baths",
  "squareFeet",
  "address"
];
// let csvStream = csv.createWriteStream({ headers: headers });

let count = 1;

const generateCSV = async (m, n, it, name) => {
  const stream = fs.createWriteStream(`cassandraData${name}.csv`);
  let csvStream = csv.createWriteStream({ headers: headers });
  let iterations = 1;

  //   console.time();

  // establish connection to csv file
  csvStream.pipe(stream);
  while (iterations <= it) {
    const repeat = async () => {
      // begin buffering memory
      csvStream.cork();

      for (let j = 0; j < n; j++) {
        let date = new Date(faker.date.past(6, "2010-05-23"));
        let obj = {
          id: count,
          price: faker.random.number({ min: 100000, max: 1000000 }),
          sellDate: `'${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()}'`,
          beds: faker.random.number({ min: 1, max: 6 }),
          baths: faker.random.number({ min: 1, max: 6 }),
          sqft: faker.random.number({ min: 450, max: 2000 }),
          streetaddress: `'${faker.address.streetAddress()}'`
        };

        // write object data to csv file
        await csvStream.write(obj);
        count += 1;
      }

      // flush buffered memory
      csvStream.uncork();
      // await Promise.resolve(stream.uncork());
    };

    for (let i = 1; i <= m; i++) {
      await repeat();
      // console.log(`${n * m * it} records made!`);
    }

    iterations += 1;
    // await stream.uncork();
  }
  //   console.timeEnd();
};
//ignore

function run() {
  console.time();

  for (let int = 0; int < 2; int++) {
    // generateCSV(50, 1000, 10, int);
    generateCSV(5, 10, 10, int);
  }
  console.timeEnd();
}

run();

// copy mykeyspace.“Tents” (id, product_id, rating, reviewer, title, body, recommend, helpful, unhelpful, posting_date) from  /path/*.csv’;

// copy mykeyspace.“House” (id, price, selldate, beds, baths, body, sqft, streetaddress) from  /cassandraData0.csv’;

// COPY mykeyspace."House" (id, price, selldate, beds, baths, sqft, streetaddress) FROM './cassandraData0.csv');
("/Users/nancynobis/Documents/projects/HackReactor/SDC/sidebar-service/database/dataGeneration");

// COPY mykeyspace."House" (id, price, selldate, beds, baths, sqft, streetaddress)
// FROM '../../Documents/projects/HackReactor/SDC/sidebar-service/database/dataGeneration/cassandraData0.csv' WITH HEADER = TRUE ;

COPY mykeyspace."House" (id, price, selldate, beds, baths, sqft, streetaddress) 
FROM '../../Documents/projects/HackReactor/SDC/sidebar-service/database/dataGeneration/cassandraData0.csv' WITH HEADER = TRUE ;
