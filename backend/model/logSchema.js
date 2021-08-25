import mongoose from 'mongoose';

const logSchema = mongoose.Schema({
  date: {type: Date, default: Date.now()},
 
});

logSchema.pre('save', function(next){
 
  const now = new Date().toLocaleString();
  console.log("date and time", now)
   if(!this.date) {
       this.date =now
   }
   next();
});
const log = mongoose.model('log', logSchema);

export default log;