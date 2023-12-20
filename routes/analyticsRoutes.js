//import express
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { bloodGroupDetailsController } = require('../controllers/analyticsController');



//create a router object
const router = express.Router()

//create routes
//GET blood data
router.get('/bloodGroups-data', authMiddleware, bloodGroupDetailsController);


//export
module.exports = router;
