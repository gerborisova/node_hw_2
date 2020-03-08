import UserGroup from '../models/UserGroup';
import User from '../models/User';
import Group from '../models/Group';


function getAllUserGroups() {
    return UserGroup.findAll();
}

function getUserById(userId) {
    return User.findAll({
        where: {
            uid: userId,
            isDeleted:false
        }
    });
}

function getGroupById(groupId) {
    return Group.findAll({
        where: {
            uid: groupId        }
    });
}

function createUserGroup(uid, username, group) {
    return  UserGroup.create({ uid, username, group });
}

module.exports = {
    getAllUserGroups,
    getUserById,
    createUserGroup,
    getGroupById

};
