import express from 'express';
import UserService from '../services/UserService';

const router = express.Router();

//  GET suggested users
router.get('/', (req, res) => {
    const substring = req.query.loginSubstring || '';
    const limit = req.query.limit || 5;
    UserService.getSuggestedUsers(substring, limit).then((result) => {
        res.send(result);
    });
});

module.exports = router;
