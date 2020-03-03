
import express from 'express';
import db from './data-access/database';

const app = express();
app.use(express.json());

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(`Error ${err}`));

// user routes
app.use('/users', require('./routes/users'));
app.use('/suggested', require('./routes/suggested'));

app.listen(3000);
