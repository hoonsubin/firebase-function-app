import * as functions from 'firebase-functions';
import express from 'express';
import { addUser, getAllUsers, updateUser, deleteUser } from './controllers/userController';

// initialize express server
const app = express();

app.get('/', (req, res) => res.status(200).send('<h1>Hello World!</h1>'));

app.post('/user', addUser);
app.get('/user', getAllUsers);
app.patch('/user/:id', updateUser);
app.delete('/user/:id', deleteUser);

// define google cloud function name. Our function will start with `/v1/<route>`
export const v1 = functions.https.onRequest(app);
