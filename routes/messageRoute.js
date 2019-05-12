const express = require('express');
const { ObjectID } = require('mongodb');
const Post = require('../models/messageModel');
const io = require('socket.io');

const router = new express.Router();


router.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })
  router.get('/messages', (req, res) => {
    Message.find({},(err, messages)=> {
      res.send(messages);
    })
  })
  router.post('/messages', (req, res) => {
    var message = new Message({
       contenu: req.body.contenu,
       destinataire: req.body.destinataire,
       expediteur: req.body.expediteur,
       date: new Date().getTime()
    });
    message.save((err) =>{
      if(err)
        sendStatus(500);
      io.emit('message', req.body);
      res.sendStatus(200);
    })
  })
// router.get('/', async (req, res) => {
//   const posts = await Post.find().sort({ timestamp: -1 });
//   res.status(200).json(posts);
// });

// router.post('/', async (req, res) => {
//   const newPost = new Post({
//     authorId: req.body.authorId,
//     avatarColor: req.body.avatarColor || 0,
//     comments: [],
//     likers: [],
//     likesCount: 0,
//     text: req.body.text,
//     timestamp: new Date().getTime()
//   });
//   try {
//     const post = await newPost.save();
//     return res.status(201).json(post);
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// });



///////////////Socket message

router.post('/getMessages',);
router.post('/userSessionCheck',);


module.exports = router;
