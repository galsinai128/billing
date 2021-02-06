let express = require('express')
let app = express();
var port = process.env.PORT || 8080;

var cors = require('cors')

app.use(cors({
  origin: ['http://localhost:3000'],
}))

// Launch app to the specified port
app.listen(port, function() {
    console.log("Running on Port "+ port);
})



//import body parser
let bodyParser = require('body-parser');

//import mongoose
let mongoose = require('mongoose');

//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//Import routes
let apiRoutes = require("./routes")

//Use API routes in the App
app.use('/api', apiRoutes)

//connect to mongoose
const dbPath = 'mongodb+srv://galsinai128:Gg200972834@cluster0.mqbrs.mongodb.net/customers?retryWrites=true&w=majority';
const options = {useNewUrlParser: true, useUnifiedTopology: true}; 
const mongo = mongoose.connect(dbPath, options);
mongo.then(res => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})

