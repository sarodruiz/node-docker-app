import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export async function signUp (req, res, next) {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username: username,
      password: hashedPassword
    });
    req.session.user = newUser;
    return res.status(201).json({
      status: "success",
      data: {
        user: newUser
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed"
    })
  }
}

export async function login (req, res, next) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({username});
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "User not found"
      });
    }
    const authenticated = await bcrypt.compare(password, user.password);
    if (authenticated) {
      req.session.user = user;
      return res.status(200).json({
        status: "success"
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Incorrect password"
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "failed"
    });
  }
}
