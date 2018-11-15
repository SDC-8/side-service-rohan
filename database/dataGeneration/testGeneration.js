/*
    {
        id: Number,
        name: String,
        imageUrl: String,
        rating: Number,
        phone: String,
        sales: Number
    }


    {
        id: Number,
        price: Number,
        sellDate:Number,
        beds: Number,
        baths: Number,
        squareFeet: Number,
        address: String
    }
*/

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

function doUncork() {
  stream.uncork();
}

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
        //process.nextTick(doUncork);
      }
      csvStream.uncork();
      await Promise.resolve(stream.uncork());
    };

    for (let i = 1; i <= m; i++) {
      await repeat();
      console.log(`${10 - iterations} iterations left!`);
    }

    iterations += 1;
    // await stream.uncork();
  }
  console.timeEnd();
};

generateCSV(1000, 100, 100);

// process.setMaxListeners(25); // <== Important line
// emitter.setMaxListeners(100)

// const generateSampledata = n => {

//     const data = [];

//   for (let i = 0; i <= n; i++) {
//     let id = Number(i);
//     let price = faker.random.number({ min: 100000, max: 1000000 });
//     let sellDate = '1999-01-08';
//     let beds = faker.random.number({ min: 1, max: 6 });
//     let baths = faker.random.number({ min: 1, max: 6 });
//     let squareFeet = faker.random.number({ min: 450, max: 2000 });
//     let address = 'the street';

//     let datum = [id, price, `'${sellDate}'`, beds, baths, squareFeet, `'${address}'`];

//     data.push(datum);
//   }

//   csv.write([data], { headers: false }).pipe(stream);

// };

// generateSampledata(1);

// csv.write([data], { headers: false }).pipe(stream);

/*
INSERT INTO houses_two.houses_tbl_two VALUES (1, 55555, '1999-01-08', 3, 2, 1200, 'the street');
*/

/*

COPY houses_two.houses_tbl_two(id,price,saleDate,beds,baths,sqft,streetAddress) 
FROM '/Users/nancynobis/Documents/projects/HackReactor/SDC/dataGenerationTest/testData1.csv' DELIMITER ',' CSV HEADER;

*/

// COPY houses_two.houses_tbl_two("id", "price", "saledate", "beds", "baths", "sqft") FROM '/Users/nancynobis/Documents/projects/HackReactor/SDC/dataGenerationTest/testData1.csv' DELIMITER ',' CSV;

// const generateSampleDataTimes = n => {

//     const start = new Date().getTime();
//     let stop;

//     const temp = [];

//   for (let i = 0; i < n; i++) {
//       let obj = {
//         id: Number(i),
//         price: faker.random.number({ min: 100000, max: 1000000 }),
//         sellDate: faker.date.past(),
//         beds: faker.random.number({ min: 1, max: 6 }),
//         baths: faker.random.number({ min: 1, max: 6 }),
//         squareFeet: faker.random.number({ min: 450, max: 2000 }),
//         address: faker.address.streetAddress(),
//       }

//       temp.push(obj);

//     stop = new Date().getTime();

//   }
//   console.log(stop - start);

// };

// generateSampleDataTimes(1000000);

/*
const fs = require("fs");
const csv = require("fast-csv");
const faker = require("faker");

*/

// const stream = fs.createWriteStream("testData1.csv");
// csv
//    .write([
//        {a: "a1", b: "b1"},
//        {a: "a2", b: "b2"}
//    ], {headers: true})
//    .pipe(stream);
