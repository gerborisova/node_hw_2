

const _sequelize = require('sequelize');

const _database = require('../data-access/database');

const _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

const User = _database2.default.define('users', {
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
