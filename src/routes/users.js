import express from 'express';
import UserService from '../services/UserService';

const router = express.Router();

// GET users which are not deleted
router.get('/', (req, res) => {
    UserService.getAllUsers().then((users) => {
        if (users.length === 0) {
            return res.send('There are no active users');
        }
        res.status(200);
        res.json(users);
    }).catch(err => {
        throw err;
    });
});

// POST user
router.post('/', (req, res) => {
    UserService.checkExisting(req.body.login).then((result) => {
        if (result.length > 0) {
            res.send('This user already exists');
        } else {
            const { error } = UserService.validateUser(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }
            const data = {
                login: req.body.login,
                password: req.body.password,
                age: req.body.age
            };
            const { uid, login, password, age, isDeleted } = data;


            UserService.createUser(uid, login, password, age, isDeleted)
                .then(user => res.json(user), res.status(200))
                .catch(err => {
                    throw err;
                });
        }
    });
});

// GET particular user if not deleted
router.get('/:uid', (req, res) =>  {
    UserService.getUserById(req.params.uid).then((result) => {
        if (result.length > 0) {
            res.status(200);
            res.send(result);
        } else {
            res.send('No such user');
        }
    }).catch((err) => res.send(err.message));
});

// DELETE user
router.delete('/:uid', (req, res) =>  {
    UserService.getUserById(req.params.uid).then((result) => {
        if (result.length > 0) {
            UserService.deleteUser(req.params.uid)
                .then((user) => {
                    res.send(user[1]);
                    res.status(200);
                }).catch((err) => res.send(err));
        } else {
            res.send('No such user');
        }
    }).catch((err) => res.send(err.message));
});

// Edit user
router.put('/:uid', (req, res) => {
    UserService.getUserById(req.params.uid).then((result) => {
        if (result.length > 0) {
            UserService.updateUser(req.body, req.params.uid)
                .then((user) => {
                    res.send(user[1]);
                    res.status(200);
                }).catch((err) => res.send(err));
        } else {
            res.send('No such user');
        }
    }).catch((err) => res.send(err.message));
});


module.exports = router;

