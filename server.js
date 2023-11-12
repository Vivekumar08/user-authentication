'use strict';
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./api/middlewares/db");

const routes = require('./api/routes/index');

const { useErrorHandler } = require('./api/middlewares/error-handler');

const app = express();

app.use(express.static("public"));

app.use(bodyParser.json({ limit: "50mb", strict: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000 }));
app.use(cors());
app.use(db.connectToDatabase);
app.use('/api/v1/', routes);

const portNumber = process.env.PORT; 
app.listen(portNumber, (err) => {
    console.log("portNumber ", process.env.PORT);
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening on port ${portNumber}`);
    }
});

app.use(useErrorHandler);