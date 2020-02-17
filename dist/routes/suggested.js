"use strict";

var _express = _interopRequireDefault(require("express"));

var _UserService = _interopRequireDefault(require("../services/UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //  GET suggested users


router.get('/', function (req, res) {
  var substring = req.query.loginSubstring || '';
  var limit = req.query.limit || 5;

  _UserService["default"].getSuggestedUsers(substring, limit).then(function (result) {
    res.send(result);
  });
});
module.exports = router;