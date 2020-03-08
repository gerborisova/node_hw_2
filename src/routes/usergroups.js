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
        res.json('usergroups');
    }).catch(err => console.log(err));
});

// ADD user to group

router.post('/', (req, res) => {
    UserGroupService.getUserById(req.body.userId).then((result) => {
        if (result.length > 0) {
            UserGroupService.getGroupById(req.body.groupId).then((groupresult) => {
                if (groupresult.length > 0) {
                    const data = {
                        userId: req.body.userId,
                        group:req.body.groupId
                    };
                    const { uid, username, group } = data;


                    UserGroupService.createUserGroup(uid, username, group)
                        .then(usergroup => res.json(usergroup), res.status(200))
                        .catch(err => console.log(err));
                } else {
                    res.send('No such group');
                }
            });
        } else {
            res.send('No such user');
        }
    }).catch((err) => res.send(err.message));
});

module.exports = router;
