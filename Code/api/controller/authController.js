import User from "./../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";

const authUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });
  try {
    const result = await User.findOne({ username: username })
      .populate("habits")
      .exec();
    if (!result) return res.sendStatus(401);

    const match = await bcrypt.compare(password, result.password);

    if (match) {
      const accessToken = await jwt.sign(
        { username, id: result._id },
        "secret"
      );

      return res
        .status(200)
        .cookie("access-token", accessToken, {
          sameSite: "none",
          secure: "false",
        })
        .json({
          id: result._id,
          username,
          heatmap: result.heatmap,
        });
    } else return res.sendStatus(401);
  } catch (err) {
    console.log("hello");
    console.log(err.message);
  }
  res.send(username);
};

const getUser = async (req, res) => {
  try {
    const result = await User.find({}).populate("habits").exec();
    return res.status(200).json({ result });
  } catch (err) {
    console.log(err);
  }
};
export default { authUser, getUser };
