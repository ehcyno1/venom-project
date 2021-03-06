const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var history = require('connect-history-api-fallback');
const app = express();

app.use(history());

const path = __dirname + '/dist/';
app.use(express.static(path));

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
//parse requests of content-type >>> application/json
app.use(bodyParser.json());
//parse requests of content-type >>> application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// connect database
const db = require("./app/models/");

/* In production */

db.sequelize.sync();

/* In development */
// db.sequelize.sync( {force: true}).then( () => {
//     console.log("Drop and re-sync mariaDB tables.");
// });

//simple route
app.get("/", (req, res) => {
    // res.json({message: "Welcome to VENOM Project"});
    res.sendFile(path + "index.html");
});

// set router
require("./app/routes/tutorial.routes")(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
