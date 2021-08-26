import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    city: String,
    field: String,
    password: { type: String, required: true },
    curTime: String,

    tokens: [{
        token: { type: String, required: true }
    }],
    city: String




});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'user');


// hashing the password

userSchema.pre('save', async function (next) {
    console.log("hashing")
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

userSchema.pre('save', function (next) {

    const now = new Date().toLocaleString();
    console.log("date and time", now)
    if (!this.date) {
        this.date = now
    }
    next();
});

// Generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, 'mynameisneetu');
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}
const user = mongoose.model('user', userSchema);

export default user;

