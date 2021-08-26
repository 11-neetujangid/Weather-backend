import express from 'express';

import { addUser, loginUser, userCity } from '../Controller/userController.js';

const route = express.Router();

route.post('/add', addUser);
route.post('/signin', loginUser);

route.post('/city', userCity);

export default route;
