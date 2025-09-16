import mongoose from "mongoose";

const medicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    dosage: String,
    frequency: String,
    startDate: Date,
    endDate: Date
  });
  
  export const Medication = mongoose.model('Medication', medicationSchema);
  