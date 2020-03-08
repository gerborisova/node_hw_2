import UserGroup from '../models/UserGroup';
import database from '../data-access/database';
import { QueryTypes } from 'sequelize';

function getAllUserGroups() {
    return UserGroup.findAll();
}


function addUserToGroup(user_uid, group_uid) {
    return database.query(`INSERT INTO usergroups (username, group_name, group_uid, user_uid) 
    SELECT users.login, groups_tables.group_name, groups_tables.uid, users.uid FROM users, groups_tables 
    WHERE users.uid='${user_uid}' 
    AND groups_tables.uid='${group_uid}'
    RETURNING *
    `, { type: QueryTypes.INSERT });
}

module.exports = {
    getAllUserGroups,
    addUserToGroup
};
