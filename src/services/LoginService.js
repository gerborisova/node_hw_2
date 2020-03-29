import User from '../models/User';

function logIn(username, password) {
    return User.findAll({
        where : {
            isDeleted: false,
            login:username,
            password
        } });
}

module.exports = {
    logIn
};
