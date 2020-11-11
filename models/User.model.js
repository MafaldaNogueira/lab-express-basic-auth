const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema (
{
  username: {
    type: String,
    trim: true, // apaga os espaços que meter antes ou depois do nome
    unique: true // a db vai ver se ja ha algum igual
     },
     password: {
       type: String,
       required:  [true, 'Password is required'],

     }
  }
)


module.exports = model('User', userSchema);

