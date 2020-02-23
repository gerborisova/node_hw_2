

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.default = void 0;

const _sequelize = _interopRequireDefault(require('sequelize'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

const _default = new _sequelize.default('postgres', 'postgres', 'postgres', {
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
});

exports.default = _default;
