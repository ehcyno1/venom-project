const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const database = require('./app/config/db.connect');
// const conn = database.getConnection();
// database.test_open(conn);

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//parse requests of content-type >>> application/json
app.use(bodyParser.json());

//parse requests of content-type >>> application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to VENOM Project"});
});

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
