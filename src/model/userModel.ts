import mongoose from 'mongoose';
export interface UserType extends mongoose.Document {
  _id?: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  facebookId: string;
  googleId: string;
  appleId: string;
  role: string;
  verified: boolean;
  active: boolean;
}

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, unique: true },
    password: { type: String },
    facebookId: { type: String, unique: true },
    googleId: { type: String, unique: true },
    appleId: { type: String, unique: true },
    role: { type: String },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<UserType>('User', userSchema);
