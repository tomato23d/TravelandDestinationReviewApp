

//options

///option 1

/// create both new place and review 
app.route('/reviewplace').post((req, res) =>{const newReviewPlace = Place.create({
  place_name: req.body.place_name,
  place_url: req.body.place_url,
  place_type: req.body.place_type
})
}) 
 .get((req, res) =>{const newReviewPlaceid = Place.findOne({
  where: {place_name: req.params.place_name}
  });
  const placeOne = newReviewPlaceid.get({plain:true});
  }) 
console.log(placeOne)
  .post((req, res) =>{const reviewData = Review.create({
  place_id: newReviewPlaceid,
  review_text: req.body.review_text,
  rate: req.body.rate,
  traveller_id: 1
  });
  res.status(200).json(reviewData);
   if(err) {
  res.status(500).json(err);
}
  });





// ////////average review rate - alternative////////////////////////
// router.get('/:place/rate', async (req, res) => {
//   try{
//     const [results, metadata] = await sequelize.query('SELECT distinct(place_id), avg(rate) as AveRate FROM review group by place_id', { raw: true }); 
//     res.status(200).json(results);
//   } catch (err) {
//     res.status(500).json(err);
//   }
//   });



/// create both new place and review : draft1
router.post('/reviewplace', async (req, res) => {
  try {
      const newReviewPlace = await Place.create({
	    place_name: req.body.place_name,
    	place_url: req.body.place_url,
    	place_type: req.body.place_type
  });
	    const newReviewPlaceid = await sequelize.query(`select id from place where place_name = ${place_name}`,
	    { type: sequelize.QueryTypes.SELECT });

      const reviewData = await Review.create({
      place_id: newReviewPlaceid,
      review_text: req.body.review_text,
      rate: req.body.rate,
      traveller_id: 1
    });

    res.status(200).json(reviewData);
    } catch (err) {
      res.status(400).json(err);
    }
});

/// create both new place and review : draft2
router.post('/reviewplace1', async (req, res) => {
  try {
    const newPlace = await sequelize.query(`insert into place (place_name, place_url, place_type) values ("${place_name}", "www.google.com", "active")`,
    { type: sequelize.QueryTypes.INSERT });
    
    const newPlaceid = await sequelize.query(`select id from place where place_name = ${place_name}`,
    { type: sequelize.QueryTypes.SELECT });

    const reviewData = await Review.create({
      place_id: newPlaceid,
      review_text: req.body.review_text,
      rate: req.body.rate,
      traveller_id: 1
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
