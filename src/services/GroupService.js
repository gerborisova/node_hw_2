import Group from '../models/Group';


function getAllGroups() {
    return Group.findAll();
}

function checkExisting(username) {
    return Group.findAll({
        where: {
            group_name: username
        }
    });
}


function createGroup(uid, group_name) {
    return  Group.create({ uid, group_name });
}

function getGroupById(id) {
    return Group.findAll({
        where: {
            uid: id
        }
    });
}

function updateGroup(body, id) {
    return Group.update(body, {
        where: {
            uid: id
        },
        returning: true,
        plain: true
    });
}


function deleteGroup(id) {
    return  Group.destroy({
        where: {
            uid: id
        },
        returning: true,
        plain: true
    });
}
module.exports = {
    getAllGroups,
    checkExisting,
    createGroup,
    getGroupById,
    updateGroup,
    deleteGroup
};
