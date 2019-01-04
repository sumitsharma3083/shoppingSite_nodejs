
 const mongoose = require('mongoose')

  const Schema  = mongoose.Schema

   const cartSchema = new Schema({
    id: {
           type: String,
           required: true
         },
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
  quantity: {
      type: Number,
      required: true
  }
   })


       module.exports = mongoose.model('carts',cartSchema)
       