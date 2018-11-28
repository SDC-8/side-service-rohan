const mongoose = require("mongoose");
const CONNECTION = require("../CONNECTION");
mongoose.Promise = global.Promise;
const { pg, Pool } = require("pg");
const connectionString = CONNECTION;

const pool = new Pool({
  connectionString: CONNECTION,
  max: 20,
  requestTimeout: 300000,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// const client = new pg.Client(connectionString);
// client.connect();
// const query = client.query(
//   "SELECT * FROM sdc_houses.sdc_houses_tbl WHERE id = 9999999"
// );
// query.on("end", () => {
//   client.end();
// });

// const topBarSchema = new mongoose.Schema({
//   id: Number,
//   name: String,
//   imageUrl: String,
//   rating: Number,
//   phone: String,
//   sales: Number
// });

// const bottomBarSchema = new mongoose.Schema({
//   id: Number,
//   price: Number,
//   sellDate: Number,
//   beds: Number,
//   baths: Number,
//   squareFeet: Number,
//   address: String
// });

// const TopBar = mongoose.model("TopBar", topBarSchema);
// const BottomBar = mongoose.model("BottomBar", bottomBarSchema);

// let getInfo = (req,res) => {
//     TopBar.find({})
//         .exec()
//         .then( item => {
//             BottomBar.find({})
//             .exec()
//             .then(bot => {
//                 var combineBars = [item, bot]
//                 if(req === '1'){
//                     var shortItem = item.slice(0,4);
//                     var shortBot = bot.slice(0,4);
//                     combineBars = [shortItem, shortBot]
//                     res.send(combineBars);
//                 }
//             console.log('combineBars', combineBars);
//             res.send(combineBars)
//             })
//         }
//     )
// }

// let getInfo = (req, res) => {
//   const client = new pg.Client(connectionString);
//   client.connect();
//   client
//     .query(`SELECT * FROM sdc_houses.sdc_houses_tbl WHERE id = ${req}`)
//     .then(house => {
//       res.send(house);
//     });
// };

let getInfo = (req, res) => {
  pool.connect((err, client, release) => {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }
    client
      .query(`SELECT * FROM sdc_houses.sdc_houses_tbl WHERE id = ${req}`)
      .then(house => {
        res.send(house);
      });
  });
};

let postInfo = (req, res) => {
  const client = new pg.Client(connectionString);
  client.connect();
  client.query("");
};

// let getOne = (req, res) => {
//   TopBar.find({})
//     .exec()
//     .then(item => {
//       BottomBar.find({})
//         .exec()
//         .then(bot => {
//           var page = req.params.page;
//           if (page === "1") {
//             var shortItem = item.slice(0, 4);
//             var shortBot = bot.slice(0, 4);
//             var combineBars = [shortItem, shortBot];
//             console.log("combine", combineBars);
//             res.sendFile(page.join(`${__dirname}/../dist/index.html`));
//           }
//         });
//     });
// };

module.exports.getInfo = getInfo;
// module.exports.TopBar = TopBar;
// module.exports.BottomBar = BottomBar;
// module.exports.getOne = getOne;
