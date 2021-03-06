const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const posts = require('./routes/postRoute');
const users = require('./routes/userRoute');
const socketio = require('socket.io');
const Conversation = require('./models/conversationModel');

const app = express();
const port = process.env.PORT || 5000;


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header("Access-Control-Allow-Credentials", true);


  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE');
    console.log('ici')
    return res.status(200).json({});
  }
  return next();
});

mongoose
  .connect(
    "mongodb+srv://hhongois:hhongois@cluster0-7faqc.gcp.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/posts', posts);
app.use('/users', users);

const http = require('http').Server(app);

const io = socketio(http, { origins: 'http://localhost:3000' });

io.on('connection', (socket) => {

  console.log('user connected');

  socket.on('msg', function (data) {
    console.log(data.user);
    Conversation.findByIdAndUpdate(data.salonId,
      {
        $push: {
          messages: {
            auteurId: data.user._id,
            userName: data.user,
            contenu: data.message,
            date: new Date().getTime()
          }
        }
      },async (err,conv)=>{
      if(err){
        socket.emit('erreur',err) ; 

      }else{
        
        console.log(conv.messages)
      }
    });

    io.sockets.in(data.salonId).emit('newmsg', data);
  });

  socket.on('conversation', (data)=>{

    if(data.user1._id !== data.user2._id){

      Conversation.findOne({$and:[{salon:{$in:[data.user1._id]} },{salon:{$in:[data.user2._id]}}]},async (err,conv)=>{

        if(err){

          socket.emit('erreur',err) ; 

        }else if(conv == null){

          const tmp = new Conversation({
            messages:[],
            salon: [data.user1._id,data.user2._id],
            date: new Date().getTime()
          });

          const salon  = await tmp.save();
          socket.join(salon.id);
          socket.emit('addSalon',salon) ;    

        }else if(conv.length > 1){

          socket.emit('erreur',conv) ;    

        }else{

          socket.join(conv.id);
          socket.emit('addSalon',conv) ;    
        }
      });

    }
  })



});

http.listen(port, () => {
  console.log(`Started up http at port ${port}`);

});
