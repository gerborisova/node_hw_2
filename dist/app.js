

const _express = _interopRequireDefault(require('express'));

const _database = _interopRequireDefault(require('./data-access/database'));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

const app = (0, _express.default)();
app.use(_express.default.json()); // Test DB

_database.default.authenticate().then(() => {
    return console.log('Database connected...');
}).catch((err) => {
    return console.log('Error '.concat(err));
}); // user routes


app.use('/users', require('./routes/users'));
app.use('/suggested', require('./routes/suggested'));
app.listen(3000);
