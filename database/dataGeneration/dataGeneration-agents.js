const fs = require("fs");
const csv = require("fast-csv");
const faker = require("faker");
const stream = fs.createWriteStream("testData2.csv");
let headers = ["id", "name", "imgUrl", "rating", "phone", "sales"];
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
        let obj = {
          id: counter,
          name: `'${faker.name.firstName()} ${faker.name.lastName()}'`,
          imgUrl: faker.fake.imageUrl(),
          rating: faker.random.number({ min: 1, max: 5 }),
          phone: faker.phone.phoneNumber(),
          sales: faker.random.number({ min: 100000, max: 10000000 })
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
//ignore
generateCSV(1000, 100, 100);
