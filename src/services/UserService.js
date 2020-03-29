import User from '../models/User';
import Joi from 'joi';
import { Op } from 'sequelize';


function validateUser(user) {
    const schema = {
        login: Joi.string().required(),
        password: Joi.string().regex(/.*?(?:[a-z].*?[0-9]|[0-9].*?[a-z]).*?/).required(),
        age: Joi.number().min(5).max(129).required()
    };
    return Joi.validate(user, schema);
}


function getAllUsers() {
    return User.findAll({
        where : {
            isDeleted: false
        }
    });
}

function checkExisting(name) {
    return User.findAll({
        where :{
            login:name,
            isDeleted:false
        }
    });
}

function createUser(uid, login, password, age, isDeleted) {
    return  User.create({ uid, login, password, age, isDeleted });
}

function getUserById(id) {
    return User.findAll({
        where: {
            uid: id,
            isDeleted:false
        }
    });
}

function deleteUser(id) {
    return  User.update({ isDeleted : true }, {
        where: {
            uid: id,
            isDeleted: false
        },
        returning: true,
        plain: true
    });
}
function updateUser(body, id) {
    return User.update(body, {
        where: {
            uid: id,
            isDeleted: false
        },
        returning: true,
        plain: true
    });
}

function getSuggestedUsers(substring, limit) {
    return User.findAll({
        where: {
            login: {
                [Op.like] : `%${substring}%`
            },
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
