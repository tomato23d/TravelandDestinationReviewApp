const express = require('express');
const routes = require('./routes');
//const fs = require('fs');
const sequelize = require('./config/connection');
const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'DJr3*5aC',
//   database: 'reviews5_db'
// },
// );
// const averageRate = 'SELECT distinct(place_id), avg(rate) as AveRate FROM reviews5_db.review group by place_id;';

// function aveRate() {
//     db.query(averageRate, (err, rows) => {
//         if (err) { return } console.log(rows);
//     })
// };

// aveRate();


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


//module.exports = db;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
});
