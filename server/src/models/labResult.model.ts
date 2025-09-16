import mongoose from "mongoose";

const labResultSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    bloodTest: {
      creatinine: Number,
      urea: Number,
      hemoglobin: Number,
      // ...
    },
    urineTest: {
      protein: String,
      ph: Number,
      glucose: String,
      // ...
    }
  });
  
export const LabResult = mongoose.model('LabResult', labResultSchema);
  