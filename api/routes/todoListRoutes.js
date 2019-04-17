'use strict';
module.exports = function (app) {
//const express = require('express');
//const router = express.Router();
  var connexion = require('../controllers/connexionController');

  
  app.post('/api/connexion/signUp', connexion.signUp);
  app.post('/api/connexion/signIn', connexion.signIn);

};
