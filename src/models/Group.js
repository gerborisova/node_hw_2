import { DataTypes } from 'sequelize';
import db from '../data-access/database';

const Group = db.define('groups', {
    uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    name: {
        type:DataTypes.CHAR
    }

}
);

module.exports = Group;
