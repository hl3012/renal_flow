import mongoose, { Document, Schema }  from "mongoose";
import bcrypt from "bcryptjs";

//to make sure this is defined correctly
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "customer" | "admin";
    labResult: mongoose.Types.ObjectId[];
    radiology: mongoose.Types.ObjectId[];
    medication: mongoose.Types.ObjectId[];
    CalendarTask: mongoose.Types.ObjectId[];
    comparePassword(password: string): Promise<boolean>;
}


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"], 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"] 
    },
    labResult: [ 
        {    
            type:mongoose.Schema.Types.ObjectId, 
            ref:"LabResult" 
        }
    ],
    radiology: [ 
        {    
            type:mongoose.Schema.Types.ObjectId, 
            ref:"Radiology" 
        }
    ],
    medication: [
        {    
            type:mongoose.Schema.Types.ObjectId, 
            ref:"Medication" 
        }
    ],
    CalendarTask: [
        {    
            type:mongoose.Schema.Types.ObjectId, 
            ref:"CalendarTask" 
        }
    ],
    role: {
        type: String,
        enum: ["customer", "admin"], 
        default: "customer"
    },
}, {
   timestamps: true
});


userSchema.pre<IUser>("save", async function(next) {
    if(!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as any);
    }
})

userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
}


const User = mongoose.model("User", userSchema);

export default User;