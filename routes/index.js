const router = require('express').Router();
const apiRoutes = require('./api');

//direct to api folder
router.use('/api', apiRoutes);

module.exports = router;
