import express from 'express';

import { addUser, loginUser, userCity, weather } from '../Controller/userController.js';

const route = express.Router();

route.post('/add', addUser);
route.post('/signin', loginUser);

route.get('/city', userCity);
route.get('/weather', weather);
// route.get('/', getHistory);


export default route;
