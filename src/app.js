import express from 'express';
import db from './data-access/database';
import { logger, errorLogger, winstonLogger } from '../config/winston';


const jsonErrorHandler = async (err, req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).send({ error: err });
};

// catch unhandled errors with process on
process.on('uncaughtException', (error) => {
    winstonLogger.log('error', error.stack);
});


const app = express();
app.use(logger, errorLogger);
app.use(jsonErrorHandler);

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(`Error ${err}`));

// user routes
app.use('/users', require('./routes/users'));
app.use('/suggested', require('./routes/suggested'));
app.use('/groups', require('./routes/groups'));
app.use('/usergroups', require('./routes/usergroups'));
app.listen(4000);
