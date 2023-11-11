const express = require("express");
const app = express();

const user = require('./auth/user');
const refreshToken = require("./auth/refreshToken");

app.use('/refreshToken', refreshToken);
app.use('/user', user);


module.exports = app;
