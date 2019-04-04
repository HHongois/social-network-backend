'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var connexion = new Schema({
  first_name: {
    type: String,
    required: 'Name'
  },
  last_name: {
    type: String,
    required: 'Last Name'
  },
  email: {
    type: String,
    required: 'E-mail'
  },
  password: {
    type: String,
    required: 'Password '
  }
});

module.exports = mongoose.model('Connexion', connexion);