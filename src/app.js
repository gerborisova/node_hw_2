import express from 'express';
import db from './data-access/database';
import { logger, errorLogger, winstonLogger } from '../config/winston';
import auth from './auth';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// catch unhandled errors with process on
process.on('uncaughtException', error => {
    winstonLogger.log('error', error.stack);
});

const app = express();
app.use(express.json());

// Enable CORS requests
app.use(cors());

// logger middleware
app.use(logger, errorLogger);

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log(`Error ${err}`));


// user routes
app.use('/login', require('./routes/login'));
app.use('/users', auth, require('./routes/users'));
app.use('/suggested', auth, require('./routes/suggested'));
app.use('/groups', auth, require('./routes/groups'));
app.use('/usergroups', auth, require('./routes/usergroups'));
app.listen(process.env.PORT);
