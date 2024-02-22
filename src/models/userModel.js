import Mongoose, { model } from "mongoose";

const UserSchema = new Mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = Mongoose.model("users", UserSchema);
export default User;
