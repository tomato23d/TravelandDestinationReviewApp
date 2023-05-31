const router = require('express').Router();
const sequelize = require('../../config/connection');

const { QueryTypes } = require('@sequelize/core');


// Import the model
const { Review, Place, Traveller } = require('../../models');

/// create review 
router.post('/', async (req, res) => {
  try {
    let placeInput = await Place.findOne({
        where: {place_name: req.body.place_name}
    });
    if (placeInput === null){
        placeInput = await Place.create({
        place_name: req.body.place_name,
        place_url: req.body.place_url,
        place_type: req.body.place_type
      });
    }
  //  else
   // {
   // const placeInputPlain = placeInput.get({plain:true});
    const reviewData = await Review.create({
        place_id: placeInput.id,
        review_text: req.body.review_text,
        rate: req.body.rate,
        traveller_id: 1
      });
      res.status(200).json(reviewData);
    } catch (err) {
      res.status(400).json(err);
    }
});


//////////////////////////////
router.get('/', async (req, res) => {
  try {
    const data = await Review.findAll({
      include: [{ model: Place }, { model: Traveller}],
  });
  
  res.status(200).json(data);

} catch (err) {
  res.status(500).json(err);
}
});


/////////////////////////////
router.get('/:place', async (req, res) => {
  try{
  const place = await Place.findOne({
    where: {place_name: req.params.place}
  });
    const review = await Review.findAll({ where: {place_id: place.id},
      include: [{ model: Place}, { model: Traveller}]});
  //console.log(review);
  res.status(200).json(review);
} catch (err) {
  res.status(500).json(err);
}
});


/////average review rate///////////////////////
router.get('/:place/rate', async (req, res) => {
  try{
  const rates = await sequelize.query('SELECT distinct(review.place_id), place.place_name, avg(review.rate) as AveRate FROM review, place where review.place_id = place.id group by review.place_id;', 
  { type: sequelize.QueryTypes.SELECT }); 
  res.status(200).json(rates);
} catch (err) {
  res.status(500).json(err);
}
});


module.exports = router;