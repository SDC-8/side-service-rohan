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

let counter = 1;

const generateCSV = async (m, n, it, start) => {
  let iterations = 1;
  // let counter = 1;

  console.time();

  // establish connection to csv file
  csvStream.pipe(stream);
  while (iterations <= it) {
    const repeat = async () => {
      // begin buffering memory
      csvStream.cork();

      for (let j = 0; j < n; j++) {
        let date = new Date(faker.date.past(10, "2010-05-23"));
        let obj = {
          id: start,
          price: faker.random.number({ min: 100000, max: 1000000 }),
          sellDate: `'${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()}'`,
          beds: faker.random.number({ min: 1, max: 6 }),
          baths: faker.random.number({ min: 1, max: 6 }),
          squareFeet: faker.random.number({ min: 450, max: 2000 }),
          address: `'${faker.address.streetAddress()}'`
        };

        // write object data to csv file
        await csvStream.write(obj);
        start += 1;
      }

      // flush buffered memory
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
//ignore
// const go = async () => {
//   if (global.gc) {
//     await generateCSV(1000, 100, 10, 1);
//     global.gc();
//     await generateCSV(1000, 100, 10, 1000000);
//     global.gc();
//     await generateCSV(1000, 100, 10, 2000000);
//   }
// };

// go();
