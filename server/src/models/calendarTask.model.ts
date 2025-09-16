import mongoose from "mongoose";

const calendarTaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    task: String,
    completed: { type: Boolean, default: false }
});
  
export const CalendarTask = mongoose.model('CalendarTask', calendarTaskSchema);
  