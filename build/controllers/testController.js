"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewPassword = exports.forgotPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

//---------------------------------- metodos para recuperar contraseña --------------------------------
function parseCookies(request) {
  var list = {},
      rc = request.headers.cookie;
  rc && rc.split(';').forEach(function (cookie) {
    var parts = cookie.split('=');
    list[parts.shift().trim()] = decodeURI(parts.join('='));
  });
  return list;
}

var forgotPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var email, message, verificationLink, emailStatus, userFound, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = req.body.email;

            if (email) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: 'user is required'
            }));

          case 3:
            message = 'Check your email for a link to reset your password';
            emailStatus = 'OK';
            _context.next = 7;
            return User.findOne({
              email: req.body.email
            }).populate("roles");

          case 7:
            userFound = _context.sent;

            if (userFound) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: "user Not found"
            }));

          case 10:
            token = jwt.sign({
              id: userFound._id,
              email: userFound.email
            }, config.SECRET, {
              expiresIn: '10m'
            });
            console.log('Usuario encontrado: ' + userFound);
            verificationLink = 'http://localhost:3000/newPassword/' + token;
            console.log('verification link: ' + verificationLink);
            userFound.resetToken = token; //res.setHeader('set-cookie', 'resetToken='+ token);
            //TODO: sendEmail

            _context.prev = 15;
            _context.next = 22;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](15);
            emailStatus = _context.t0;
            return _context.abrupt("return", res.status(400).json({
              message: 'something went wrong'
            }));

          case 22:
            _context.prev = 22;
            _context.next = 25;
            return User.save(userFound);

          case 25:
            _context.next = 31;
            break;

          case 27:
            _context.prev = 27;
            _context.t1 = _context["catch"](22);
            emailStatus = _context.t1;
            return _context.abrupt("return", res.status(400).json({
              message: 'no se pudo guardar el token del usuario para resetear contraseña'
            }));

          case 31:
            res.json({
              message: message,
              info: emailStatus
            });
            console.log('usuario guardado con el token de reseteo');

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[15, 18], [22, 27]]);
  }));

  return function forgotPassword(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //Create new PASSWORD-----------------------------------


exports.forgotPassword = forgotPassword;

var createNewPassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var newPassword, resetToken, jwtPayload, userFound;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            newPassword = req.body.newPassword;
            resetToken = res.setHeader('set-cookie', 'resetToken=' + token);

            if (!(resetToken && newPassword)) {
              res.status(400).json({
                message: 'All fields are required'
              });
            }

            userFound = User;
            _context2.prev = 4;
            jwtPayload = jwt.verify(resetToken, config.RESET_SECRET);
            _context2.next = 8;
            return User.findOne({
              resetToken: resetToken
            });

          case 8:
            userFound = _context2.sent;
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](4);
            res.status(400).json({
              message: 'Something went wrong'
            });

          case 14:
            userFound.password = newPassword;
            _context2.next = 17;
            return User.encryptPassword(password);

          case 17:
            _context2.next = 19;
            return User.save(userFound);

          case 19:
            res.json({
              message: 'password changed'
            });

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 11]]);
  }));

  return function createNewPassword(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createNewPassword = createNewPassword;