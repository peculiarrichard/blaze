import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide firstName"],
    unique: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide lastName"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}
