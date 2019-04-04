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

exports.signUp = (req, res) =>{
  console.log(req.body);
  var user = new Connexion(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.status(200).json({
      message: "Successfully signed up!"
    })
  });
};


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


