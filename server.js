const Express = require("express");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors');
Connexion = require('./api/models/connexion.js');

const CONNECTION_URL = "mongodb+srv://hhongois:hhongois@cluster0-7faqc.gcp.mongodb.net/test?retryWrites=true";
// const DATABASE_NAME = "example";

// mongoose.Promise = global.Promise;

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.listen(4000,() => console.log(`Server running on port 4000`));
var database, collection;

app.use(cors());
mongoose
  .connect(CONNECTION_URL, {
      useNewUrlParser:true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// app.listen(4000, () => {
//     mongoose.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {

//         console.log("Connected bd!");
//     });
// });

 const routes = require('./api/routes/todoListRoutes')(app);
 //app.use(routes);
//  routes(app); 
