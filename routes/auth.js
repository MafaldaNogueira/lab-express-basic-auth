const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const User = require('../models/User.model');
const { Mongoose } = require('mongoose');

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});


router.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashPassword = bcrypt.hashSync(password, salt);

  if(username === '' || password === '') {
    res.render('auth/signup', 
    {
      errorMessage: 'Indicate username and password'
    })
  }


  User.findOne({'username': username}) 
    .then((user) => {
      if(user) { 
        res.render('auth/signup', {
          errorMessage: 'The username already exists'
        });
        return;
      }
      User.create({username, password: hashPassword})
      .then(() => {
        res.redirect('/'); 
      })
      .catch((error) => {
      if(error.code === 11000){ 
          res.render('auth/signup', {
            errorMessage: 'Username and email need to be unique'
          })
      } 
      })
    });
});




module.exports = router;