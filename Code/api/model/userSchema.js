import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  habits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Habit" }],
  heatmap: [{}],
});
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
