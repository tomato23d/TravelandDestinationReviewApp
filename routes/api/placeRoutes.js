const router = require('express').Router();

// Import the model
const { Place, Review, Traveller } = require('../../models');


router.post('/', async (req, res) => {
  try {
  const newPlace = await Place.create({
    place_name: req.body.place_name,
    place_url: req.body.place_url,
    place_type: req.body.place_type
  });
  //console.log(newPlace);
  res.status(200).json(newPlace);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/', async (req, res) => {
  try {
    const data = await Place.findAll();
    res.status(200).json(data);
} catch (err) {
  res.status(500).json(err);
}
});




module.exports = router;