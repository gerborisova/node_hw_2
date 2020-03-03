

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _database = require('./data-access/database');

const _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

const app = (0, _express2.default)();
app.use(_express2.default.json());

// Test DB
_database2.default.authenticate().then(() => {
    return console.log('Database connected...');
}).catch((err) => {
    return console.log(`Error ${  err}`);
});

// user routes
app.use('/users', require('./routes/users'));
app.use('/suggested', require('./routes/suggested'));

app.listen(3000);
