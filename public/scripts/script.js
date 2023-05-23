const mysql = require('mysql2');
//const db = require('../../server');
const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'DJr3*5aC',
    database: 'reviews_db'
},);

console.log("script is on");
//const report1 = 'select r.review_text, r.rate, p.*, t.traveller_name from  reviews_db.place p, reviews_db.review r, reviews_db.traveller t where r.traveller_id = t.id and r.place_id = p.id;';

const report = 'select r.record_id, r.review_text, r.rate, place_name, place_url, place_type, senior_friendly, baby_friendly, pet_friendly, four_wd_only, t.traveller_name from  reviews_db.place p, reviews_db.review r, reviews_db.traveller t where r.traveller_id = t.id and r.place_id = p.id;';
const insertRecord = `INSERT INTO reviews_db.review (record_id, review_text, rate, place_id, traveller_id) values ("a219", "cinnamon is a great spice", 5, 2, 1);`;

const feedRecord = () => {
    db.query(`INSERT INTO reviews_db.review (record_id, review_text, rate, place_id, traveller_id) values ("a219", "donuts are great", 5, 2, 1);`, (err) => {
        if (err) throw err;
        console.log("review has been recorded");
        //selectTask();
    })
};

//feedRecord();

const printReviews = () => {
    db.query(report, (err, rows) => {
        if (err) throw err;
        console.log(rows);
    });
}

printReviews();
