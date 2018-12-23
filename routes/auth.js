
  const authController = require('../controller/auth')


const express = require('express')

const Router = express.Router();


Router.get('/login',authController.getLoginRoute)
Router.post('/login',authController.postLoginRoute)



module.exports = Router