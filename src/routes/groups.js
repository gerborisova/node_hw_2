import express from 'express';
import GroupService from '../services/GroupService';

const router = express.Router();

// GET all groups
router.get('/', (req, res) => {
    GroupService.getAllGroups().then((groups) => {
        if (groups.length === 0) {
            return res.send('There are no active groups');
        }
        res.status(200);
        res.json(groups);
    }).catch(err => console.log(err));
});

// GET group by ID
router.get('/:uid', (req, res) =>  {
    GroupService.getGroupById(req.params.uid).then((result) => {
        if (result.length > 0) {
            res.status(200);
            res.send(result);
        } else {
            res.send('No such group');
        }
    }).catch((err) => res.send(err.message));
});


// CREATE group
router.post('/', (req, res) => {
    GroupService.checkExisting(req.body.name).then((result) => {
        if (result.length > 0) {
            res.send('This user already exists');
        } else {
            const data = {
                name: req.body.name
            };
            const { uid, name } = data;


            GroupService.createGroup(uid, name)
                .then(user => res.json(user), res.status(200))
                .catch(err => console.log(err));
        }
    });
});

// UPDATE group
router.put('/:uid', (req, res) => {
    GroupService.getGroupById(req.params.uid).then((result) => {
        if (result.length > 0) {
            GroupService.updateGroup(req.body, req.params.uid)
                .then((group) => {
                    res.send(group[1]);
                    res.status(200);
                }).catch((err) => res.send(err));
        } else {
            res.send('No such group');
        }
    }).catch((err) => res.send(err.message));
});

// HARD delete group
router.delete('/:uid', (req, res) =>  {
    GroupService.getGroupById(req.params.uid).then((result) => {
        if (result.length > 0) {
            GroupService.deleteGroup(req.params.uid)
                .then(() => {
                    res.send('Group successfully deleted');
                    res.status(200);
                }).catch((err) => res.send(err));
        } else {
            res.send('No such group');
        }
    }).catch((err) => res.send(err.message));
});


module.exports = router;
