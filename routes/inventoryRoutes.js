//import express
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createInventoryController, getInventoryController, getDonorsController, getHospitalsController, getOrganisationsController, getOrganisationsForHospitalsController, getInventoryHospitalController, getRecentInventoryController } = require('../controllers/inventoryController');

//create a router object
const router = express.Router()

//create routes
//Add inventory using POST
router.post('/create-inventory', authMiddleware, createInventoryController);

//GET all Blood Records
router.get('/get-inventory', authMiddleware, getInventoryController);

//GET recent Blood Records
router.get('/get-recent-inventory', authMiddleware, getRecentInventoryController);

//GET all Hospital Blood Records
router.post('/get-inventory-hospital', authMiddleware, getInventoryHospitalController);

//GET all Donor Records
router.get('/get-donors', authMiddleware, getDonorsController);

//GET all Hospital Records
router.get('/get-hospitals', authMiddleware, getHospitalsController);

//GET all Organisation Records
router.get('/get-organisations', authMiddleware, getOrganisationsController);

//GET all Organisation Records for hospitals
router.get('/get-organisations-for-hospitals', authMiddleware, getOrganisationsForHospitalsController);

//export
module.exports = router;
