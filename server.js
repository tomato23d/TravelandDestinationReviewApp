const express = require('express');
const routes = require('./routes');
const fs = require('fs');
const sequelize = require('./config/connection');
const mysql = require('mysql2');

const db = mysql.createConnection({

  host: 'localhost',
  user: 'root',
  password: 'DJr3*5aC',
  database: 'reviews_db'
},);


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//post to json and sql in one function/// have been replaced by router.post
// app.post('/api/reviews', (req, res) => {

//   console.info(`${req.method} request received to add a review`);

//   const { review_text, rate, place_id, traveller_id } = req.body;
//     if (review_text && rate && place_id && traveller_id) {
//       // Variable for the object we will save
//       const newReview = {
//         review_text,
//         rate,
//         place_id,
//         traveller_id
//                         };

//     const reviewString = JSON.stringify(newReview);

//      fs.writeFile('./db/one_review.json', reviewString, (err) =>
//     {err ? console.error(err): console.log("success")});

//         const readAndAppend = () => {
//         fs.readFile('./db/reviews.json', 'utf8', (err, data) =>{
//           if (err) {console.error(err);}
//           else {
//             const parsedData = JSON.parse(data);
//             parsedData.push(newReview);

//         fs.writeFile('./db/reviews.json', JSON.stringify(parsedData), (err) =>
//         err ? console.error(err) : console.info("json file is updated"));
//             }
//         });
//             };
//             readAndAppend();

//     const feedRecord = () => {
//         db.query(`INSERT INTO reviews3_db.review (review_text, rate, place_id, traveller_id) values ("${req.body.review_text}", ${req.body.rate}, ${req.body.place_id}, ${req.body.traveller_id});`, (err) => {
//         if (err) throw err;
//           console.log("review has been recorded to database");
//       })
//   };
//     feedRecord();
//           }
// });


sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
});
