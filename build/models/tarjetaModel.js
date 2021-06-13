"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var tarjetaSchema = new _mongoose.Schema({
  /* name: String,
   category: String,
   price: Number,*/
  titulo: String,
  cabecera: String,
  celular: String,
  direccion: String,
  correo: String
}, {
  timeStamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)('Tarjeta', tarjetaSchema);

exports["default"] = _default;