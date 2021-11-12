import mongoose, { Document, Schema } from "mongoose";

export interface UserInterface extends Document {
  nickname: string;
  password: string;
  email: string;
  role: string;
  institution: string;
  isSent: boolean;
  isReviewed: boolean;
  images: number;
  create: number;
  review: number;
  checkOld: number;
  bonus: number;
}

const UserModel = new Schema({
  nickname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  isSent: {
    type: Boolean,
    required: true,
  },
  isReviewed: {
    type: Boolean,
    required: true,
  },
  images: {
    type: Number,
    required: true,
  },
  create: {
    type: Number,
    required: true,
  },
  review: {
    type: Number,
    required: true,
  },
  bonus: {
    type: Number,
    required: true,
  },
  checkOld: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<UserInterface>("User", UserModel);
