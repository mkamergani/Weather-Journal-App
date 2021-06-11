// Dependencies 
const bodyParser = require('body-parser');
const cors = require('cors');
// Require Express to run server and routes
const express = require ('express');
// Start up an instance of app
const app = express();

// Setup empty JS object to act as endpoint for all routes
 projectData = {};

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors()); 

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
port = 8000;
const server = app.listen(port,startServer);
function startServer ()
{
    console.log("Server started successfully");
    console.log(`running on localhost: ${port}`);
}

//Routes

app.get('/all',getData)
function getData (req, res){
    res.send(projectData);
}

app.post('/add',addData)
function addData(req, res){
    console.log("Data posted");
    projectData ["temperature"] = req.body.temperature;
    projectData ["date"] = req.body.date;
    projectData ["userResponse"] = req.body.userResponse;
    console.log(projectData);
}