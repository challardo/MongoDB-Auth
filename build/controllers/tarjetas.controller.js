"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTarjetaById = exports.updateTarjetaById = exports.getTarjetaById = exports.getTarjetasAdmin = exports.getTarjetas = exports.createTarjeta = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _tarjetaModel = _interopRequireDefault(require("../models/tarjetaModel"));

var multer = require('multer');

var createTarjeta = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, titulo, cabecera, celular, direccion, correo, tarjetaImage, newTarjeta, TarjetaSaved;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body);
            _req$body = req.body, titulo = _req$body.titulo, cabecera = _req$body.cabecera, celular = _req$body.celular, direccion = _req$body.direccion, correo = _req$body.correo, tarjetaImage = _req$body.tarjetaImage;
            newTarjeta = new _tarjetaModel["default"]({
              titulo: titulo,
              cabecera: cabecera,
              celular: celular,
              direccion: direccion,
              correo: correo,
              tarjetaImage: req.file.path
            });
            _context.next = 5;
            return newTarjeta.save();

          case 5:
            TarjetaSaved = _context.sent;
            res.status(201).redirect('/dashboard');

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createTarjeta(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createTarjeta = createTarjeta;

var getTarjetas = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var tarjetas;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _tarjetaModel["default"].find();

          case 2:
            tarjetas = _context2.sent;
            //res.json(tarjetas)
            res.render('pages/home', {
              tarjetas: tarjetas
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getTarjetas(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getTarjetas = getTarjetas;

var getTarjetasAdmin = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var tarjetas;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _tarjetaModel["default"].find();

          case 2:
            tarjetas = _context3.sent;
            //res.json(tarjetas)
            res.render('pages/dashboard', {
              tarjetas: tarjetas
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getTarjetasAdmin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getTarjetasAdmin = getTarjetasAdmin;

var getTarjetaById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var tarjeta;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _tarjetaModel["default"].findById(req.params.tarjetaId);

          case 2:
            tarjeta = _context4.sent;
            res.render('pages/updateTarjeta', {
              tarjeta: tarjeta
            });

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getTarjetaById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getTarjetaById = getTarjetaById;

var updateTarjetaById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body2, titulo, cabecera, celular, direccion, correo, tarjetaImage, newTarjeta, tarjeta;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _req$body2 = req.body, titulo = _req$body2.titulo, cabecera = _req$body2.cabecera, celular = _req$body2.celular, direccion = _req$body2.direccion, correo = _req$body2.correo, tarjetaImage = _req$body2.tarjetaImage;
            newTarjeta = {
              titulo: titulo,
              cabecera: cabecera,
              celular: celular,
              direccion: direccion,
              correo: correo,
              tarjetaImage: req.file.path
            };
            _context5.next = 5;
            return _tarjetaModel["default"].findByIdAndUpdate(req.params.tarjetaId, newTarjeta, {
              "new": true
            });

          case 5:
            tarjeta = _context5.sent;
            console.log(tarjeta);
            res.status(201).redirect('/dashboard');
            _context5.next = 13;
            break;

          case 10:
            _context5.prev = 10;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 10]]);
  }));

  return function updateTarjetaById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.updateTarjetaById = updateTarjetaById;

var deleteTarjetaById = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function deleteTarjetaById(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteTarjetaById = deleteTarjetaById;