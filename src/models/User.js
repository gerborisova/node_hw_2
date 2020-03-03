import { DataTypes } from 'sequelize';
import db from '../data-access/database';


const User = db.define('users', {
    uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    login: {
        type:DataTypes.CHAR
    },
    password: {
        type:DataTypes.CHAR
    },
    age: {
        type:DataTypes.INTEGER
    },
    isDeleted: {
        type: DataTypes.BOOLEAN
    }

}
);

module.exports = User;
