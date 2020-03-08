
import express from 'express';
import db from './data-access/database';

const app = express();
app.use(express.json());

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(`Error ${err}`));

// user routes
app.use('/usergroups', require('./routes/usergroups'));
app.use('/users', require('./routes/users'));
app.use('/suggested', require('./routes/suggested'));
app.use('/groups', require('./routes/groups'));

// app.use('/usergroups', require('./routes/usergroups'));

app.listen(3000);
