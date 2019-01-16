
const mongoose = require('mongoose')
 
const Schema   = mongoose.Schema

 const userSchema =  new Schema({
       name:{
           type: String,
           required: true
       },
       email: {
           type: String,
           required: true
       },
       resetToken: String,
       resetTokenExpiration: Date,
       password: {
           type: String,
           required: true
       },
       cart : {
           type: Array
       }
 })
 module.exports = mongoose.model('users', userSchema)

