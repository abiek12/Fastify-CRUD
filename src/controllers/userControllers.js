import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export async function createUser(req, replay) {
  try {
    const { Username, Email, Password } = req.body;
    if (!(Username && Email && Password)) {
      replay.code(400).send("All fields are compulsorry!");
    } else {
      const existingUser = await User.findOne({ email: Email });
      if (existingUser) {
        replay.code(400).send("User Already Exist");
      } else {
        const hashedPassword = await bcrypt.hash(Password, 10);
        await User.create({
          userName: Username,
          email: Email,
          password: hashedPassword,
        });
        replay.code(201).send({
          message: "User Created",
        });
      }
    }
  } catch (error) {
    replay.code(500).send(error);
  }
}

export async function getUser(req, replay) {
  try {
    const { Email, Password } = req.body;
    if (!(Email && Password)) {
      replay.code(400).send("All fields are compulsorry!");
    } else {
    
    }
  } catch (error) {
    replay.code(500).send(error);
  }
}

export async function updateUser(req, replay) {
  try {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      replay.code(400).send("All fields are compulsorry!");
    } else {
    }
  } catch (error) {
    replay.code(500).send(error);
  }
}

export async function deleteUser(req, replay) {
  try {
  } catch (error) {
    replay.code(500).send(error);
  }
}
