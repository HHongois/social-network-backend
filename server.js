const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const posts = require('./routes/postRoute');
const users = require('./routes/userRoute');
// const dbURI = process.env.REACT_APP_DB_URI || require('./secrets').dbURI;
const io = require('socket.io');

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
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE');
//     console.log('ici')
//     return res.status(200).json({});
//   }
//   return next();
// });


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

const socket = io(http,{origins: 'http://localhost:3000'});

socket.on('connection', (socket)=>{
console.log('user connected');
socket.on('SEND_MESSAGE', function(data){
  socket.emit('RECEIVE_MESSAGE', data);
});
});

http.listen(port, () => {
  console.log(`Started up http at port ${port}`);
  
 });

// app.listen(port, () => {
//  console.log(`Started up at port ${port}`);
 
// });
