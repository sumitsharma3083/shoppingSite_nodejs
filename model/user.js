// const Mongodb = require('mongodb') 
// const getdb   = require('../util/database').db
// var db;
// class User{
//     constructor(name,email,password)
//     {
//       this.name  = name,
//       this.email = email,
//       this.password = password
//     }

//     save()
//     {
       
//       db = getdb();
//       db.collection('users').insertOne(this).then((result) => {
//          console.log("User successfully created")
//      }).catch((err) => {
//          console.log(err)
//      });
//     }

//     static findById(userid)
//     {
//      db = getdb();
//       db.collection('users').findOne({_id: Mongodb.ObjectId(userid)}).then((result) => {
             
//       }).catch((err) => {
//             console.log(err)
//       });
//     }
// }
  
//  module.exports = User;


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
       cart: {
           items : [
               {
                   productId: {
                       type: Schema.Types.ObjectId, 
                       ref: 'products',
                       required: true}, 
                    quantity: {
                        type: Number, 
                        required: true
                    }
                }
                  ]
       }
 })

    


 module.exports = mongoose.model('users', userSchema)

