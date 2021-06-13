"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _tarjetas = _interopRequireDefault(require("./routers/tarjetas.routes"));

var app = (0, _express["default"])();

var ejslayout = require('express-ejs-layouts');

app.set('view engine', 'ejs');
app.use(ejslayout);
app.use(_express["default"]);
app.use(_express["default"].urlencoded({
  extended: true
}));
app.set('pkg', _package["default"]);
app.use((0, _morgan["default"])('dev'));
/*app.get('/',(req,res) => {
res.json({
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
})
});*/
//app.use(tarjetaRoutes);

var _default = app;
exports["default"] = _default;