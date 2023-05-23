const router = require('express').Router();
//const fs = require('fs');

// Import the model
const Review = require('../../models/review');

/// post on router require fix
router.post('/', async (req, res) => {
  const reviewData = await Review.create(req.body);

  return res.json(reviewData);
});



//   Review.create({
//     review_text: req.body.review_text,
//     rate: req.body.rate,
//     place_id: req.body.place_id,
//     traveller_id: req.body.traveller_id
//   })


//select rate//disable for a sec
// router.get('/:rate', (req, res) => {

//   Review.findAll(
//     {
//       order: ['traveller_id'],
//       where: { 
//         rate: req.params.rate 
//       },
//       //attributes: {
//         //     //   exclude: ['is_paperback', 'edition'],
//         //     // },
//     }
//   ).then((data) => {
//     res.json(data);
//   });
// });
/////////////////////////////

//select place
router.get('/:place', (req, res) => {

  Review.findAll(
    {
      order: ['id'],
      where: { 
        place: req.params.place 
      },
    }
  ).then((data) => {
    res.json(data);
  });
});




//////////////////////////////
router.get('/', async (req, res) => {
  const data = await Review.findAll();
  return res.json(data);
});


module.exports = router;