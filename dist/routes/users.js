"use strict";

var _express = _interopRequireDefault(require("express"));

var _UserService = _interopRequireDefault(require("../services/UserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); // GET users which are not deleted


router.get('/', function (req, res) {
  _UserService["default"].getAllUsers().then(function (users) {
    if (users.length === 0) {
      return res.send('There are no active users');
    }

    res.status(200);
    res.json(users);
  })["catch"](function (err) {
    return console.log(err);
  });
}); // POST user

router.post('/', function (req, res) {
  _UserService["default"].checkExisting(req.body.login).then(function (result) {
    if (result.length > 0) {
      res.send('This user already exists');
    } else {
      var _UserService$validate = _UserService["default"].validateUser(req.body),
          error = _UserService$validate.error;

      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }

      var data = {
        login: req.body.login,
        password: req.body.password,
        age: req.body.age
      };
      var uid = data.uid,
          login = data.login,
          password = data.password,
          age = data.age,
          isDeleted = data.isDeleted;

      _UserService["default"].createUser(uid, login, password, age, isDeleted).then(function (user) {
        return res.json(user);
      }, res.status(200))["catch"](function (err) {
        return console.log(err);
      });
    }
  });
}); // GET particular user if not deleted

router.get('/:uid', function (req, res) {
  _UserService["default"].getUserById(req.params.uid).then(function (result) {
    if (result.length > 0) {
      res.status(200);
      res.send(result);
    } else {
      res.send('No such user');
    }
  })["catch"](function (err) {
    return res.send(err.message);
  });
}); // DELETE user

router["delete"]('/:uid', function (req, res) {
  _UserService["default"].getUserById(req.params.uid).then(function (result) {
    if (result.length > 0) {
      _UserService["default"].deleteUser(req.params.uid).then(function (user) {
        res.send(user[1]);
        res.status(200);
      })["catch"](function (err) {
        return res.send(err);
      });
    } else {
      res.send('No such user');
    }
  })["catch"](function (err) {
    return res.send(err.message);
  });
}); // Edit user

router.put('/:uid', function (req, res) {
  _UserService["default"].getUserById(req.params.uid).then(function (result) {
    if (result.length > 0) {
      _UserService["default"].updateUser(req.body, req.params.uid).then(function (user) {
        res.send(user[1]);
        res.status(200);
      })["catch"](function (err) {
        return res.send(err);
      });
    } else {
      res.send('No such user');
    }
  })["catch"](function (err) {
    return res.send(err.message);
  });
});
module.exports = router;