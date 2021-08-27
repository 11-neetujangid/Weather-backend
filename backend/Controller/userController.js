import bcrypt from 'bcryptjs';
import user from '../model/userSchema.js';
import request from 'request';
import history from '../model/historySchema.js';
import log from '../model/logsSchema.js';


export const addUser = async (req, res) => {
    console.log("hello")
    console.log(req.body)

    const { name, email, city, field, password } = req.body;

    if (!name || !email || !city || !field || !password) {
        console.log("if form not filled")
        return res.json({ error: "please filled form properly" });
    }
    try {
        const userExist = await user.findOne({ email: email })
        console.log(userExist)

        if (userExist) {
            console.log("email already exit")
            return res.status(422).json({ error: "Email already Exist" });
        }

        const User = new user({ name, email, city, field, password });
        console.log("Users", User);
        // hasing
        const a = await User.save();
        console.log(a)
        res.json(a);


    } catch (err) {
        console.log(err);
        res.json({ message: err.message })
    }

}

export const loginUser = async (req, res) => {
    console.log("login")
    console.log(req.body)



    try {
        let token;
        const { email, password } = req.body;
        console.log(req.body)
        if (!email || !password) {

            console.log("fill the form");
            return res.status(400).json({ error: "fill form" })
        }

        const userLogin = await user.findOne({ email: email });
        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            console.log(isMatch);

            token = await userLogin.generateAuthToken();
            console.log(token);

            const id = userLogin._id;
            const name = userLogin.name;
            console.log(name)
            console.log(id);

            const email = userLogin.email;
            console.log(email)

            if (!isMatch) {
                console.log("error");
                res.status(400).json({ error: "error" })
            }

            else {

                console.log("password is matched")

                const curTime = new Date().toLocaleString();
                console.log(curTime);

                const User = user.updateOne({ email: userLogin.email }, { $set: { curTime: curTime } });
                console.log("date");
                await User.updateOne();

                console.log(curTime)
                const LogDate = new log({ email, curTime });
                console.log("Log", LogDate);
                const a = await LogDate.save();
                console.log(a)
                res.json({ message: "Successfully Login", token: token, id: userLogin._id, name: userLogin.name, email: userLogin.email, date: curTime });

            }
        }
        else {
            res.status(400).json({ message: "error" })
        }

    } catch (err) {
        console.log("not correct")
        console.log(err);
    }

}
export const userCity = async (req, res) => {
    console.log("city");
    console.log(req.query);
    try {
        const { city, email, data } = req.query;
        console.log(city);
        console.log(email);


        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b841d1ce2644a8991e7d8bea9907255e`
        // console.log(url)
        request(url, async (err, response, body) => {
            const data = JSON.parse(body);
            console.log(data);

            const weatherData = data.weather;
            console.log("city data", weatherData);
            res.json(data.weather);

            const curTime = new Date().toLocaleString();
            console.log(curTime);
            // const weatherdes = data.weather.description
            const User = new history({ email, city, curTime, weatherData});
            console.log("history", User);
            const a = await User.save();
            console.log("history data", a);

        })
        // const curTime = new Date().toLocalString();
        // console.log(curTime);

        // const User = new history({ email,city, curTime});
        // console.log("history", User);
        // const a = await User.save();
        // console.log("history data", a);


    } catch (err) {
        console.log("errrr")
        res.json({ message: err.message })
    }
}

export const weather = async (req, res) => {

    console.log(req.query);
    try {
        const { lat, long } = req.query;
        console.log(lat);
        console.log(long);
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b841d1ce2644a8991e7d8bea9907255e`
        request(url, (err, response, body) => {
            const data = JSON.parse(body);
            console.log(data);
            res.status(200).json(data.weather);
        })

    } catch (err) {
        console.log("errrr")
        res.json({ message: err.message })
    }
}
export const getHistory = async (req, res) => {
    console.log("get history data");
    const email = req.params.email;
    console.log(email)
    try {
        const data = await history.find({ email: email });
        console.log("get", data)
        res.json(data);
    } catch (err) {
        res.json({ message: err.message })
    }

}



