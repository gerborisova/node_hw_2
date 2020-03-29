import express from 'express';
import LoginService from '../services/LoginService';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', (req, res) => {
    LoginService.logIn(req.body.username, req.body.password)
        .then(user => {
            if (user.length > 0) {
                jwt.sign({ user }, 'secretkey', (err, token) => {
                    if (err) {
                        throw new Error(err);
                    } else {
                        res.json({
                            token
                        });
                    }
                });
            } else {
                res.send('No such user');
            }
        })
        .catch(err => {
            res.send(err.message);
        });
});

module.exports = router;
