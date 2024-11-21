const { Schema, model }  = require('mongoose');
// Schema and Model
const userSchema = new Schema({
     name: { type: String, required: true },
     age: { type: Number, required: true },
   });
   
 
module.exports = model('User', userSchema)  
