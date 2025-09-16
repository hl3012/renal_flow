import mongoose from "mongoose";

const radiologySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: String, // Ultrasound / MRI etc
    imageUrl: String,
    description: String,
    date: { type: Date, default: Date.now }
});
  
export const Radiology = mongoose.model('Radiology', radiologySchema);
  