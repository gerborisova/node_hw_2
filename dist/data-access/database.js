

Object.defineProperty(exports, '__esModule', {
    value: true
});

const _sequelize = require('sequelize');

const _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = new _sequelize2.default('myDB', 'postgres', 'postgres', {
    dialect: 'postgres',
    pool: { max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});
