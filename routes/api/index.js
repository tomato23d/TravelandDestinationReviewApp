const router = require('express').Router();
const reviewRoutes = require('./reviewRoutes');


router.use('/reviews', reviewRoutes);

module.exports = router;
