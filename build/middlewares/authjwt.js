"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdmin = exports.isModerator = exports.checkUser = exports.verifyToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _roleModel = _interopRequireDefault(require("../models/roleModel"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var verifyToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var cookies, token, decoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cookies = req.cookies;
            token = cookies.token; //console.log(req.cookies.token)

            if (token) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", res.render('pages/login'));

          case 4:
            decoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            req.userId = decoded.id;
            _context.next = 8;
            return _userModel["default"].findById(req.userId, {
              password: 0
            });

          case 8:
            user = _context.sent;

            if (user) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.render('pages/login'));

          case 11:
            next();

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var checkUser = function checkUser(req, res, next) {
  var token = req.cookies.token; // const decoded =jwt.verify(token, config.SECRET)
  //req.userId = decoded.id;
  //const UserId = req.userId

  if (token) {
    _jsonwebtoken["default"].verify(token, _config["default"].SECRET, /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err, decodedToken) {
        var user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!err) {
                  _context2.next = 6;
                  break;
                }

                console.log(err.message);
                res.locals.user = null;
                next();
                _context2.next = 11;
                break;

              case 6:
                _context2.next = 8;
                return _userModel["default"].findById(decodedToken.id);

              case 8:
                user = _context2.sent;
                //  console.log(user)
                res.locals.user = user;
                next();

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x4, _x5) {
        return _ref2.apply(this, arguments);
      };
    }());
  } else {
    res.locals.user = null;
    next();
  }
};

exports.checkUser = checkUser;

var isModerator = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var user, roles, i;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _userModel["default"].findById(req.userId);

          case 2:
            user = _context3.sent;
            _context3.next = 5;
            return _roleModel["default"].find({
              _id: {
                $in: user.roles
              }
            });

          case 5:
            roles = _context3.sent;
            i = 0;

          case 7:
            if (!(i < roles.length)) {
              _context3.next = 14;
              break;
            }

            if (!(roles[i].name === "moderator")) {
              _context3.next = 11;
              break;
            }

            next();
            return _context3.abrupt("return");

          case 11:
            i++;
            _context3.next = 7;
            break;

          case 14:
            console.log('require moderator role');
            return _context3.abrupt("return", res.redirect('/'));

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function isModerator(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

exports.isModerator = isModerator;

var isAdmin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var user, roles, i;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _userModel["default"].findById(req.userId);

          case 2:
            user = _context4.sent;
            _context4.next = 5;
            return _roleModel["default"].find({
              _id: {
                $in: user.roles
              }
            });

          case 5:
            roles = _context4.sent;
            i = 0;

          case 7:
            if (!(i < roles.length)) {
              _context4.next = 14;
              break;
            }

            if (!(roles[i].name === "admin")) {
              _context4.next = 11;
              break;
            }

            next();
            return _context4.abrupt("return");

          case 11:
            i++;
            _context4.next = 7;
            break;

          case 14:
            console.log('require admin role');
            return _context4.abrupt("return", res.redirect('/'));

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function isAdmin(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.isAdmin = isAdmin;