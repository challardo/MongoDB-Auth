"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var router = (0, _express.Router)();
router.get('/tarjetas', function (req, res) {
  res.render('pages/tarjetas');
});
var _default = router;
exports["default"] = _default;