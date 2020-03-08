import express from 'express';
import UserGroupService from '../services/UserGroupService';


const router = express.Router();

// GET all groups
router.get('/', (req, res) => {
    UserGroupService.getAllUserGroups().then((usergroups) => {
        if (usergroups.length === 0) {
            return res.send('There are no active groups');
        }
        res.status(200);
        res.json(usergroups);
    }).catch(err => console.log(err));
});

// ADD user to group

router.post('/', (req, res) => {
    UserGroupService.addUserToGroup(req.body.userId, req.body.groupId).then((result) => {
        res.json(result[0]);
    }).catch((err) => {
        res.send(err.message);
    });
});

module.exports = router;
