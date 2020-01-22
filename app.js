
import Joi from 'joi';
import express from 'express';

const app = express();
app.use(express.json());


const users = [];

// Returns all active users
app.get('/users', (req, res) => {
    res.send(getActiveUsers());
});

// Returns the given user if existing
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) res.status(404).send('The user with the given ID was not found');
    res.send(user);
});


// Deletes the user with this id if found and isn't already deleted
app.delete('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
     if (!user) {
        res.status(404).send('The user with the given ID was not found');
    }
    if (user.isDeleted === true) {
        res.status(400).send('This user was already deleted');
    }
   
    user.isDeleted = true;
    res.send(user);
});
// Creates user if not alread existing
app.post('/users', (req, res) => {
    const result = userExists(req.body.login);
    if (result === false) {
        const { error } = validateUser(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;
        }
        const user = {
            id: users.length + 1,
            login: req.body.login,
            password: req.body.password,
            age: req.body.age,
            isDeleted: false
        };
        users.push(user);
        res.send(user);
    } else {
        res.status(400).send('This user already exists');
    }
});
// Filtered by loginSubstring and returns limit number of users
app.get('/suggest', (req, res) => {
    const substring = req.query.loginSubstring || '';
    const limit = req.query.limit || 5;

    const filteredUsers = users.filter(user => user.login.indexOf(substring) !== -1);
    filteredUsers.sort((a, b) => a.login.localeCompare(b.login));
    const sliced = filteredUsers.slice(0, limit);

    res.send(sliced);
});

// Edit existing user 

app.put('/users/:id', (req,res)=>{
    const user = users.find(u => u.id === parseInt(req.params.id));
     if (!user) {
        res.status(404).send('The user with the given ID was not found');
    }else{ 
        if(req.body){
            const { error } = validateUser(req.body);
            if (error) {
                res.status(400).send(error.details[0].message);
                return;
            }
            user.id= user.id,
            user.login= req.body.login || user.login,
            user.password= req.body.password || user.password,
            user.age= req.body.age || user.age,
            user.isDeleted= user.isDeleted
        }
        res.send(user);
    }



})
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


function validateUser(user) {
    const schema = {
        login: Joi.string().required(),
        password: Joi.string().regex(/.*?(?:[a-z].*?[0-9]|[0-9].*?[a-z]).*?/).required(),
        age: Joi.number().min(5).max(129).required()
    };
    return Joi.validate(user, schema);
}

function getActiveUsers() {
    const activeUsers = users.filter(user => user.isDeleted === false);
    return activeUsers;
}

function userExists(login) {
    const existing = getActiveUsers().filter(user => user.login === login);
    return existing.length > 0;
}
