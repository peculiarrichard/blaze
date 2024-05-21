import mongoose from "mongoose";

const aiGeneratedtexts = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  generatedText: {
    type: String,
    required: true,
  }
});

const AiGeneratedText =
  mongoose.models.aiGeneratedtexts || mongoose.model("aiGeneratedtexts", aiGeneratedtexts);
export default AiGeneratedText;


export interface AllGeneratedText {
  _id: string;
  prompt: string;
  userId: string;
  generatedText: string;
}