"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _tarjetaModel = _interopRequireDefault(require("../models/tarjetaModel"));

var tarjetaController = _interopRequireWildcard(require("../controllers/tarjetas.controller"));

var authController = _interopRequireWildcard(require("../controllers/auth.controller"));

var _middlewares = require("../middlewares");

var _userModel = _interopRequireDefault(require("../models/userModel"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* jshint esversion: 6 */
var express = require('express');

var path = require('path');

var router = express.Router();
module.exports = router; //----------- autenticacion --------------

router.get('*', _middlewares.authJwt.checkUser);
router.get('/login', authController.login);
router.post('/login', authController.postLogin);
router.get('/register', authController.register);
router.post('/register', authController.postRegister); //----------- Rutas de tarjetas --------------

router.get('/', tarjetaController.getTarjetas);
router.get('/dashboard', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], tarjetaController.getTarjetasAdmin);
router.post('/dashboard', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], tarjetaController.createTarjeta);
router.get('/createTarjeta', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], function (req, res) {
  res.render('pages/createTarjeta');
});
router.get('/edit/:tarjetaId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var tarjeta;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _tarjetaModel["default"].findById(req.params.tarjetaId);

          case 2:
            tarjeta = _context.sent;
            res.render('pages/updateTarjeta', {
              tarjeta: tarjeta
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/edit/:tarjetaId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var tarjeta;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _tarjetaModel["default"].findByIdAndUpdate(req.params.tarjetaId, req.body, {
              "new": true
            });

          case 3:
            tarjeta = _context2.sent;
            res.redirect('/dashboard');
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/delete/:tarjetaId', [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var tarjeta;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _tarjetaModel["default"].findByIdAndRemove(req.params.tarjetaId);

          case 2:
            tarjeta = _context3.sent;
            res.redirect('/dashboard');

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/set-cookies', authController.cookieTest);
router.get('/logout', authController.logout_get);
router.get('/forgotPassword', function (req, res) {
  res.render('pages/forgotPassword');
});
router.get('/resetPassword/:resetToken', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var resetToken;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _userModel["default"].findOne({
              resetToken: req.params.resetToken
            });

          case 2:
            resetToken = _context4.sent;
            res.render('pages/resetPassword', {
              resetToken: resetToken
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.post('/forgotPassword', authController.forgotPassword);
router.put('/forgotPassword', authController.forgotPassword);
router.put('/resetPassword', authController.createNewPassword);
router.get('/emailsent', function (req, res) {
  res.render('pages/emailsent');
});
router.post('/resetPassword', authController.createNewPassword); //router.post('/resetPassword', authController.createNewPassword)
//router.post('/changePassword', authController.changePassword)