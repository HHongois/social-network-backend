const Express = require("express");
const BodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require('cors');
Connexion = require('./api/models/connexion.js');

const CONNECTION_URL = "mongodb+srv://hhongois:hhongois@cluster0-7faqc.gcp.mongodb.net/test?retryWrites=true";


var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: false }));
app.listen(4000,() => console.log(`Server running on port 4000`));

app.use(cors());
mongoose
  .connect(CONNECTION_URL, {
      useNewUrlParser:true
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


 const routes = require('./api/routes/todoListRoutes')(app);
 
