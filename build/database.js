"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

_mongoose["default"].connect("mongodb+srv://admin:1s7mQZBlDpkeCuxp@test.o5igj.mongodb.net/test?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(function (db) {
  return console.log('DB is connected');
})["catch"](function (error) {
  return console.log(error);
});