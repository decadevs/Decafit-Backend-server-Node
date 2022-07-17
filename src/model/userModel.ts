import mongoose from 'mongoose';
export interface UserType extends mongoose.Document {
  fullName: string;
  email: string;
  phoneNumber: number;
  password: string;
  facebookId: string;
  googleId: string;
  appleId:string;
  role: string;
  active: boolean;
}

const userSchema = new mongoose.Schema({
  fullName: { type: String,required: true, },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number,unique: true },
  password: { type: String },
  facebookId: { type: String },
  googleId: { type: String },
  appleId:{ type: String },
  role: { type: String },
  active: { type: Boolean, default: false },
 
}, {
  timestamps: true,
});

export const User = mongoose.model<UserType>('User', userSchema);

// export User;