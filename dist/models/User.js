"use strict";

var _sequelize = require("sequelize");

var _database = _interopRequireDefault(require("../data-access/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var User = _database["default"].define('users', {
  uid: {
    type: _sequelize.DataTypes.UUID,
    defaultValue: _sequelize.DataTypes.UUIDV1,
    primaryKey: true
  },
  login: {
    type: _sequelize.DataTypes.CHAR
  },
  password: {
    type: _sequelize.DataTypes.CHAR
  },
  age: {
    type: _sequelize.DataTypes.INTEGER
  },
  isDeleted: {
    type: _sequelize.DataTypes.BOOLEAN
  }
});

module.exports = User;