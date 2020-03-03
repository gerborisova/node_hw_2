

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _UserService = require('../services/UserService');

const _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

const router = _express2.default.Router();

// GET users which are not deleted
router.get('/', (req, res) => {
    _UserService2.default.getAllUsers().then((users) => {
        if (users.length === 0) {
            return res.send('There are no active users');
        }
        res.status(200);
        res.json(users);
    }).catch((err) => {
        return console.log(err);
    });
});

// POST user
router.post('/', (req, res) => {
    _UserService2.default.checkExisting(req.body.login).then((result) => {
        if (result.length > 0) {
            res.send('This user already exists');
        } else {
            const _UserService$validate = _UserService2.default.validateUser(req.body);
            const error = _UserService$validate.error;

            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }
            const data = {
                login: req.body.login,
                password: req.body.password,
                age: req.body.age
            };
            const uid = data.uid;
            const login = data.login;
            const password = data.password;
            const age = data.age;
            const isDeleted = data.isDeleted;


            _UserService2.default.createUser(uid, login, password, age, isDeleted).then((user) => {
                return res.json(user);
            }, res.status(200)).catch((err) => {
                return console.log(err);
            });
        }
    });
});

// GET particular user if not deleted
router.get('/:uid', (req, res) => {
    _UserService2.default.getUserById(req.params.uid).then((result) => {
        if (result.length > 0) {
            res.status(200);
            res.send(result);
        } else {
            res.send('No such user');
        }
    }).catch((err) => {
        return res.send(err.message);
    });
});

// DELETE user
router.delete('/:uid', (req, res) => {
    _UserService2.default.getUserById(req.params.uid).then((result) => {
        if (result.length > 0) {
            _UserService2.default.deleteUser(req.params.uid).then((user) => {
                res.send(user[1]);
                res.status(200);
            }).catch((err) => {
                return res.send(err);
            });
        } else {
            res.send('No such user');
        }
    }).catch((err) => {
        return res.send(err.message);
    });
});

// Edit user
router.put('/:uid', (req, res) => {
    _UserService2.default.getUserById(req.params.uid).then((result) => {
        if (result.length > 0) {
            _UserService2.default.updateUser(req.body, req.params.uid).then((user) => {
                res.send(user[1]);
                res.status(200);
            }).catch((err) => {
                return res.send(err);
            });
        } else {
            res.send('No such user');
        }
    }).catch((err) => {
        return res.send(err.message);
    });
});

module.exports = router;
