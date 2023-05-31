

// ////////average review rate - alternative////////////////////////
// router.get('/:place/rate', async (req, res) => {
//   try{
//     const [results, metadata] = await sequelize.query('SELECT distinct(place_id), avg(rate) as AveRate FROM review group by place_id', { raw: true }); 
//     res.status(200).json(results);
//   } catch (err) {
//     res.status(500).json(err);
//   }
//   });



