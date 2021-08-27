import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const logsSchema = mongoose.Schema({

    email: String,
    curTime: String,

});

autoIncrement.initialize(mongoose.connection);
logsSchema.plugin(autoIncrement.plugin, 'log');

const log = mongoose.model('log', logsSchema);

export default log;

