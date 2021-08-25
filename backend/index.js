import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import route from './route/routes.js'

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use('/users', route);

const port = 7000;
const url = "mongodb://localhost:27017/weather";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log("successfully conneted....")

    }).catch(err => {
        console.log(err)
    })
app.listen(port, () => console.log(`server is running on port ${port}`))




