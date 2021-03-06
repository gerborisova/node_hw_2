

const _User = _interopRequireDefault(require('../models/User'));

const _joi = _interopRequireDefault(require('joi'));

const _sequelize = require('sequelize');

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
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
        login: _joi.default.string().required(),
        password: _joi.default.string().regex(/.*?(?:[a-z].*?[0-9]|[0-9].*?[a-z]).*?/).required(),
        age: _joi.default.number().min(5).max(129).required()
    };
    return _joi.default.validate(user, schema);
}

function getAllUsers() {
    return _User.default.findAll({
        where: {
            isDeleted: false
        }
    });
}

function checkExisting(name) {
    return _User.default.findAll({
        where: {
            login: name,
            isDeleted: false
        }
    });
}

function createUser(uid, login, password, age, isDeleted) {
    return _User.default.create({
        uid,
        login,
        password,
        age,
        isDeleted
    });
}

function getUserById(id) {
    return _User.default.findAll({
        where: {
            uid: id,
            isDeleted: false
        }
    });
}

function deleteUser(id) {
    return _User.default.update({
        isDeleted: true
    }, {
        where: {
            uid: id,
            isDeleted: false
        },
        returning: true,
        plain: true
    });
}

function updateUser(body, id) {
    return _User.default.update(body, {
        where: {
            uid: id,
            isDeleted: false
        },
        returning: true,
        plain: true
    });
}

function getSuggestedUsers(substring, limit) {
    return _User.default.findAll({
        where: {
            login: _defineProperty({}, _sequelize.Op.like, '%'.concat(substring, '%')),
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
