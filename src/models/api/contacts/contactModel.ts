import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Please provide phone number"],
    unique: true,
  },
  isOnWhatsapp: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt : {
    type: Date,
    default: Date.now
  },
  updatedAt : {
    type: Date,
    default: Date.now
  },
  userId : {
    type: String,
    required: [true, "Please provide user id"],
  }
});

const Contacts =
  mongoose.models.contacts || mongoose.model("contacts", contactSchema);

export default Contacts;

export interface ContactInterface {
  name: string;
  email: string;
  phone: string;
  isOnWhatsapp: boolean;
}
