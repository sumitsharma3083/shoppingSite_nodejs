const express = require('express')
const Router = express.Router();

const authController = require('../controller/auth')

//GET      /login
Router.get('/login',authController.getLoginRoute)


//GET     /register
Router.get('/register',authController.getRegisterRoute)


//POST    /register

Router.post('/register', authController.postRegisterRoute)

module.exports = Router