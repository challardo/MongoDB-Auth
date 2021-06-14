"use strict";

require("./database");

var _initialSetup = require("./libs/initialSetup");

/*import app from './app'
const router = require('./routers/routes');
app.use('/', router);
app.listen(3000);
console.log('server listening to port:', 3000)*/
var cookieParser = require('cookie-parser');

var express = require('express');

var ejslayouts = require('express-ejs-layouts');

var router = require('./routers/routes');

var tarjetasRouter = require('./routers/tarjetas.routes');

var app = express();
(0, _initialSetup.createRoles)();
var port = process.env.PORT || 3000;
app.set('views', 'src/views');
app.set('view engine', 'ejs');
app.use(ejslayouts);
app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use('/', router);
app.use(express["static"](__dirname + "public"));
app.use('/uploads', express["static"]('uploads')); //app.use('/',tarjetasRouter);

app.listen(port, function () {
  console.log("servidor activo en el puerto: " + port);
});