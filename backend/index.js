import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import route from './route/routes.js'
import request from 'request';

const app = express();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use('/users', route);

// var Url = 'https://api.openweathermap.org/data/2.5/weather?q=Indore&appid=b841d1ce2644a8991e7d8bea9907255e'
// console.log(Url)

// app.get('/', (req, res) => {
//     request(Url, function (err, res, body) {
//         var data = JSON.parse(body);
//         console.log(data);

//     })
// })

const port = 7000;
const url = "mongodb://localhost:27017/weather";


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log("successfully conneted....")

    }).catch(err => {
        console.log(err)
    })
app.listen(port, () => console.log(`server is running on port ${port}`))




