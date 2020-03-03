

const _User = require('../models/User');

const _User2 = _interopRequireDefault(_User);

const _joi = require('joi');

const _joi2 = _interopRequireDefault(_joi);

const _sequelize = require('sequelize');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    } return obj;
}

function validateUser(user) {
    const schema = {
        login: _joi2.default.string().required(),
        password: _joi2.default.string().regex(/.*?(?:[a-z].*?[0-9]|[0-9].*?[a-z]).*?/).required(),
        age: _joi2.default.number().min(5).max(129).required()
    };
    return _joi2.default.validate(user, schema);
}

function getAllUsers() {
    return _User2.default.findAll({
        where: {
            isDeleted: false
        } });
}

function checkExisting(name) {
    return _User2.default.findAll({
        where: {
            login: name,
            isDeleted: false
        }
    });
}

function createUser(uid, login, password, age, isDeleted) {
    return _User2.default.create({ uid, login, password, age, isDeleted });
}

function getUserById(id) {
    return _User2.default.findAll({
        where: {
            uid: id,
            isDeleted: false
        }
    });
}

function deleteUser(id) {
    return _User2.default.update({ isDeleted: true }, {
        where: {
            uid: id,
            isDeleted: false
        },
        returning: true,
        plain: true
    });
}
function updateUser(body, id) {
    return _User2.default.update(body, {
        where: {
            uid: id,
            isDeleted: false
        },
        returning: true,
        plain: true
    });
}

function getSuggestedUsers(substring, limit) {
    return _User2.default.findAll({
        where: {
            login: _defineProperty({}, _sequelize.Op.like, `%${  substring  }%`),
            isDeleted: false
        },
        limit,
        returning: true
    });
}
module.exports = {
    getAllUsers,
    validateUser,
    checkExisting,
    createUser,
    getUserById,
    deleteUser,
    updateUser,
    getSuggestedUsers
};
