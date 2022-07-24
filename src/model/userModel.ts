import mongoose, { Types } from 'mongoose';
export interface UserType extends mongoose.Document {
  id:Types.ObjectId
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  facebookId: string;
  googleId: string;
  appleId:string;
  role: string;
  verified: boolean;
}

const userSchema = new mongoose.Schema({
  fullName: { type: String,required: true, },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String,unique: true },
  password: { type: String },
  facebookId: { type: String },
  googleId: { type: String },
  appleId:{ type: String },
  role: { type: String },
  verified: { type: Boolean, default: false },
 
}, {
  timestamps: true,
});

export const User = mongoose.model<UserType>('User', userSchema);