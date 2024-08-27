import Habit from "../model/habitSchema.js";
import User from "../model/userSchema.js";

const createHabit = async (req, res) => {
  const newHabit = req.body;
  try {
    const result = await Habit.create(newHabit);
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const getAllHabit = async (req, res) => {
  const newHabit = req.body;
  try {
    const result = await Habit.find({});
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const updateHabit = async (req, res) => {
  const { habits } = req.body;
  const { id: userId } = req.params;
  try {
    const result = await User.findOneAndUpdate(
      { _id: userId },
      {
        heatmap: habits,
      }
    );
    return res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export default { createHabit, updateHabit, getAllHabit };

