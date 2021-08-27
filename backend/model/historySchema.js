import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const historySchema = mongoose.Schema({
    email: String,
    city: String,
    curTime: String,
    weatherData: Object


});

autoIncrement.initialize(mongoose.connection);
historySchema.plugin(autoIncrement.plugin, 'history');



const history = mongoose.model('history', historySchema);

export default history;

