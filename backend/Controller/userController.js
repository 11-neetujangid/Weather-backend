import bcrypt from 'bcryptjs';
import user from '../model/userSchema.js';


export const addUser = async (req, res) => {
    console.log("hello")

    console.log(req.body)

    const { name, email, city, field, password} = req.body;

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

        const User = new user({ name, email, city, field, password});
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
        const { email, password} = req.body;
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

            if (!isMatch) {
                console.log("error");
                res.status(400).json({ error: "error" })
            }

            else {

                console.log("password is matched")

                const curTime = new Date().toLocaleString();
                console.log(curTime);
                
                const User = user.updateOne({ email: userLogin.email }, {$set: { curTime: curTime } });
                console.log("date");
                await User.updateOne();


                res.json({ message: "Successfully Login", token: token, id: userLogin._id, name: userLogin.name, date:curTime});
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
    console.log("city")
    // console.log(req.body)
     
}
