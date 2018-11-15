const fs = require("fs");
const csv = require("fast-csv");
const faker = require("faker");
const stream = fs.createWriteStream("testData1.csv");
let headers = [
  "id",
  "price",
  "sellDate",
  "beds",
  "baths",
  "squareFeet",
  "address"
];
let csvStream = csv.createWriteStream({ headers: headers });

const generateCSV = async (m, n, it) => {
  let iterations = 1;
  let counter = 1;

  console.time();
  csvStream.pipe(stream);
  while (iterations <= it) {
    //   stream.cork();

    const repeat = async () => {
      csvStream.cork();

      for (let j = 0; j < n; j++) {
        let date = new Date(faker.date.past(10, "2010-05-23"));
        let obj = {
          id: counter,
          price: faker.random.number({ min: 100000, max: 1000000 }),
          sellDate: `'${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()}'`,
          beds: faker.random.number({ min: 1, max: 6 }),
          baths: faker.random.number({ min: 1, max: 6 }),
          squareFeet: faker.random.number({ min: 450, max: 2000 }),
          address: `'${faker.address.streetAddress()}'`
        };

        await csvStream.write(obj);
        counter += 1;
      }
      csvStream.uncork();
      // await Promise.resolve(stream.uncork());
    };

    for (let i = 1; i <= m; i++) {
      await repeat();
      console.log(`${it - iterations} iterations left!`);
    }

    iterations += 1;
    // await stream.uncork();
  }
  console.timeEnd();
};

generateCSV(1000, 100, 100);
