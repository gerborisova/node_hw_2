import { DataTypes } from 'sequelize';
import db from '../data-access/database';

const UserGroup = db.define('usergroups', {
    uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    username: {
        type:DataTypes.CHAR
    },
    group_name:{
        type:DataTypes.CHAR
    },
    group_uid:{
        type: DataTypes.UUID

    },
    user_uid:{
        type: DataTypes.UUID

    }

}
);

module.exports = UserGroup;