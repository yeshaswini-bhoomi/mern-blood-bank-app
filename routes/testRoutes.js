//created for test

//import express
const express = require('express');
const { testController } = require('../controllers/testController');

//creating router object for storing routing functionalities in a variable
const router = express.Router();

//routes
router.get("/", testController);

//export
module.exports = router;