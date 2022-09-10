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
  avatar: string,
  active: boolean;
}

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, unique: true },
    password: { type: String },
    facebookId: { type: String},
    googleId: { type: String},
    appleId: { type: String },
    role: { type: String },
    avatar: { type: String },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<UserType>('User', userSchema);
