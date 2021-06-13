"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewPassword = exports.forgotPassword = exports.logout_get = exports.cookieTest = exports.postLogin = exports.postRegister = exports.login = exports.register = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _roleModel = _interopRequireDefault(require("../models/roleModel"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _morgan = require("morgan");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _mailer = require("../mailer");

var lodash = require('lodash');

var register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            res.render('pages/register');

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.register = register;

var login = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res.render('pages/login');

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.login = login;

var postRegister = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, username, email, password, roles, userFound, newUser, foundRoles, role, savedUser, token;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, username = _req$body.username, email = _req$body.email, password = _req$body.password, roles = _req$body.roles;
            userFound = _userModel["default"].find({
              email: email
            });
            _context3.t0 = _userModel["default"];
            _context3.t1 = username;
            _context3.t2 = email;
            _context3.next = 7;
            return _userModel["default"].encryptPassword(password);

          case 7:
            _context3.t3 = _context3.sent;
            _context3.t4 = {
              username: _context3.t1,
              email: _context3.t2,
              password: _context3.t3
            };
            newUser = new _context3.t0(_context3.t4);

            if (!roles) {
              _context3.next = 17;
              break;
            }

            _context3.next = 13;
            return _roleModel["default"].find({
              name: {
                $in: roles
              }
            });

          case 13:
            foundRoles = _context3.sent;
            newUser.roles = foundRoles.map(function (role) {
              return role._id;
            });
            _context3.next = 21;
            break;

          case 17:
            _context3.next = 19;
            return _roleModel["default"].findOne({
              name: "user"
            });

          case 19:
            role = _context3.sent;
            newUser.roles = [role._id];

          case 21:
            _context3.next = 23;
            return newUser.save();

          case 23:
            savedUser = _context3.sent;
            token = _jsonwebtoken["default"].sign({
              id: savedUser
            }, _config["default"].SECRET, {
              expiresIn: 86400 //24 HORAS

            });
            console.log('saved user:' + savedUser);
            res.setHeader('set-cookie', 'token=' + token);
            res.render('pages/login');

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function postRegister(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.postRegister = postRegister;

var postLogin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var userFound, matchPassword, token;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _userModel["default"].findOne({
              email: req.body.email
            }).populate("roles");

          case 2:
            userFound = _context4.sent;

            if (userFound) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              message: "user Not found"
            }));

          case 5:
            _context4.next = 7;
            return _userModel["default"].comparePassword(req.body.password, userFound.password);

          case 7:
            matchPassword = _context4.sent;

            if (matchPassword) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", res.status(401).json({
              token: null,
              message: 'Invalid password'
            }));

          case 10:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id
            }, _config["default"].SECRET, {
              expiresIn: 86400
            });
            console.log('user found: ' + userFound + '    user token:' + token);
            res.setHeader('set-cookie', 'token=' + token); //res.cookie('newUser',false);

            res.redirect('/dashboard');

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postLogin(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var cookieTest = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var token;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            token = 'dfasdfasdfasdfasdfbrr';
            res.setHeader('set-cookie', 'token=' + token);
            console.log(req.cookies.token);
            res.send('you got the cookies!');

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function cookieTest(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.cookieTest = cookieTest;

var logout_get = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            res.cookie('token', '', {
              maxAge: 1
            });
            res.redirect('/');

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function logout_get(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.logout_get = logout_get;

var forgotPassword = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var email, userFound, token, verificationLink, savedToken;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            email = req.body.email;

            if (email) {
              _context7.next = 3;
              break;
            }

            return _context7.abrupt("return", res.status(400).json({
              message: 'user is required'
            }));

          case 3:
            _context7.next = 5;
            return _userModel["default"].findOne({
              email: email
            });

          case 5:
            userFound = _context7.sent;

            if (userFound) {
              _context7.next = 8;
              break;
            }

            return _context7.abrupt("return", res.status(400).json({
              message: "user Not found"
            }));

          case 8:
            token = _jsonwebtoken["default"].sign({
              id: userFound._id,
              email: userFound.email
            }, _config["default"].RESET_SECRET, {
              expiresIn: '10m'
            });
            console.log('Usuario encontrado: ' + userFound);
            verificationLink = req.protocol + "://" + req.get('host') + '/resetPassword/' + token;
            console.log('verification link: ' + verificationLink); //  console.log('verification token: ' +token)

            _context7.next = 14;
            return userFound.updateOne({
              resetToken: token
            }, function (err, success) {
              if (err) {
                return res.status(400).json({
                  error: 'reset password link error'
                });
              } // send mail with defined transport object


              // send mail with defined transport object
              var info = _mailer.transporter.sendMail({
                from: '"Forgot Password 👻" <MiSandbox.correo@gmail.com>',
                // sender address
                to: userFound.email,
                // list of receivers
                subject: "Reset password",
                // Subject line
                text: "Este es el link para resetear tu password",
                // plain text body
                html: '<b>Haz click aqui:</b>  <a href="' + verificationLink + '"> Change password </a>' // html body

              }, function (err, info) {
                console.log(info.envelope);
                console.log(info.messageId);
              }); // return res.json({success:'email sent'})

            });

          case 14:
            savedToken = _context7.sent;
            console.log('verification token: ' + token);
            res.redirect('/emailsent');

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function forgotPassword(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.forgotPassword = forgotPassword;

var createNewPassword = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var _req$body2, resetToken, newPass;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _req$body2 = req.body, resetToken = _req$body2.resetToken, newPass = _req$body2.newPass;

            if (!resetToken) {
              _context9.next = 6;
              break;
            }

            _jsonwebtoken["default"].verify(resetToken, _config["default"].RESET_SECRET, function (error, decodedToken) {
              if (error) {
                return res.status(401).json({
                  error: "incorrect link or it has expired"
                });
              }
            });

            _userModel["default"].findOne({
              resetToken: resetToken
            }, /*#__PURE__*/function () {
              var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(err, user) {
                var obj;
                return _regenerator["default"].wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        if (!(err || !user)) {
                          _context8.next = 2;
                          break;
                        }

                        return _context8.abrupt("return", res.status(400).json({
                          error: 'user with this token does not exist'
                        }));

                      case 2:
                        _context8.next = 4;
                        return _userModel["default"].encryptPassword(newPass);

                      case 4:
                        _context8.t0 = _context8.sent;
                        obj = {
                          password: _context8.t0,
                          resetToken: ''
                        };
                        user = lodash.extend(user, obj);
                        user.save(function (err, result) {
                          if (err) {
                            return res.status(400).json({
                              error: 'reset password error'
                            });
                          } else {
                            return res.status(200).redirect('/login');
                          }
                        });

                      case 8:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8);
              }));

              return function (_x17, _x18) {
                return _ref9.apply(this, arguments);
              };
            }());

            _context9.next = 7;
            break;

          case 6:
            return _context9.abrupt("return", res.status(401).json({
              error: "error reseting password"
            }));

          case 7:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function createNewPassword(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.createNewPassword = createNewPassword;