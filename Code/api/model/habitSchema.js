import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  value: [
    {
      date: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  ],
});
const HabitModel = mongoose.model("Habit", habitSchema);

export default HabitModel;
