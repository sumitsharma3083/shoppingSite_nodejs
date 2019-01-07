
 const mongoose = require('mongoose')

  const Schema  = mongoose.Schema

   const cartSchema = new Schema({
    title: {
      type : String,
      required : true
     },
    price: {
      type: Number,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  imageUrl: {
      type: String,
      required: true
  },
  useremail :{
      type: String,
      required: true
  }
   })


       module.exports = mongoose.model('carts',cartSchema)
       