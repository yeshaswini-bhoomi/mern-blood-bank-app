//import express
const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getDonorsListController, getHospitalsListController, getOrganisationsListController, deleteDonorController } = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');

//create router object
const router = express.Router();
//create routes

//GET Donor List
router.get('/donor-list', authMiddleware,adminMiddleware, getDonorsListController)

//GET Hospital List
router.get('/hospital-list', authMiddleware,adminMiddleware, getHospitalsListController)

//GET Organisation List
router.get('/organisation-list', authMiddleware,adminMiddleware, getOrganisationsListController)

//Delete Donor using GET Method
router.delete('/delete-donor/:id', authMiddleware, adminMiddleware, deleteDonorController)

//export
module.exports = router;