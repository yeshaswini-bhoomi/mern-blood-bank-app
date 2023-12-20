//created for authentication

//import express
const express = require('express')
const { registerController, loginController,currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

//create router object
const router = express.Router()

//routes
//1. create route for REGISTER method used:POST
router.post('/register', registerController);

//2. create route for LOGIN method used:POST
router.post('/login', loginController);

//GET Current user || GET
router.get("/current-user", authMiddleware, currentUserController);

//export routes
module.exports = router;