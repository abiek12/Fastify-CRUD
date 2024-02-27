import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

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
          message: "User Created Successfully",
        });
      }
    }
  } catch (error) {
    replay.code(500).send(error);
  }
}

export async function logIn(req, replay) {
  try {
    const { Email, Password } = req.body;
    if (!(Email && Password)) {
      replay.code(400).send("All fields are compulsorry!");
    } else {
      // Finding the user from db
      const user = await User.findOne({ email: Email });
      if (!user) {
        replay.code(404).send("User Not Found!");
      } else {
        // Decrypting and comparing password
        const passwordMatch = await bcrypt.compare(Password, user.password);
        if (!passwordMatch) {
          replay.code(401).send("Authentcation Failed!");
        } else {
          // JWT
          const token = jsonwebtoken.sign({ id: user._id }, "AB123", {
            expiresIn: "1m",
          });
          // cookie
          user.token = token;
          const options = {
            expiresIn: new Date(Date.now() + 60 * 60),
            httpOnly: true,
          };
          replay
            .code(200)
            .cookie("token", token, options)
            .send("Login Successfull");
        }
      }
    }
  } catch (error) {
    replay.code(500).send(error);
  }
}

export async function getUser(req, replay) {
  try {
    console.log(req);
    const user = await User.findById({ id: req.user.id }).select("-password");
    if (!user) {
      replay.code(404).send("User Not Found");
    } else {
      replay.code(200).send({ user });
    }
  } catch (error) {
    replay.code(500).send(error);
  }
}

export async function updateUser(req, replay) {
  try {
    const { Username, Email, Password } = req.body;
    if (!(Username && Email && Password)) {
      replay.code(400).send("All fields are compulsorry!");
    } else {
      const user = await User.findById(req.params.id);
      if (!user) {
        replay.code(404).send("User not found");
      } else {
        const hashedPassword = await bcrypt.hash(Password, 10);
        await user.updateOne({
          $set: { userName: Username, email: Email, password: hashedPassword },
        });
        replay.code(200).send("Updated Successfully");
      }
    }
  } catch (error) {
    replay.code(500).send(error);
  }
}

export async function deleteUser(req, replay) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      replay.code(404).send("User not found");
    } else {
      await user.deleteOne({ id: req.params.id });
      replay.code(200).send("Deleted Successfully");
    }
  } catch (error) {
    replay.code(500).send(error);
  }
}
