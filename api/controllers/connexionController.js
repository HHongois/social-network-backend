'use strict';


var mongoose = require('mongoose'),
  Connexion = mongoose.model('Connexion');

// exports.list_all_tasks = function(req, res) {
//   Task.find({}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };
// console.log('ici');

exports.signUp = (req, res) => {
  console.log(req.body.email);
  let tmp = Connexion.findOne({ email: req.body.email }, (err, connexion) => {
    console.log(err);
    console.log(connexion)
    if (err || connexion) {
      return res.status(400).json({ error: 'E-mail already exist !' });

    } else {
      var user = new Connexion(req.body);
      user.save((err, user) => {
        if (err) {
          return res.status(400).json(err);
        }
        res.status(200).json({
          message: "Successfully signed up!"
        })
      });
    }
  });
}

exports.signIn = (req, res) => {
  console.log('ici');

  console.log(req.body.email);
  console.log(req.body.password);

  let tmp = Connexion.findOne({ email: req.body.email, password: req.body.password }, (err, connexion) => {
    console.log(err);
    console.log(connexion)
    if (connexion) {
      return res.status(200).json({ error: 'You are connected !' });

    } else {
      return res.status(400).json(err);
    }

  });
}



// exports.signIn = function(req, res) {
//   Connexion.findUser(req.params.email,req.params.password, function(err, user) {
//     if (err)
//       res.send(err);
//     res.json(user);
//   });
// };


// exports.update_a_task = function(req, res) {
//   Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };


// exports.delete_a_task = function(req, res) {


//   Task.remove({
//     _id: req.params.taskId
//   }, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };


