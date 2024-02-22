// import User from "../models/userModel";

export async function createUser(req, replay) {
  try {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      replay.code(400).send("All fields are compulsorry!");
    } else {
      replay.code(200).send("hiii");
    }
  } catch (error) {
    replay.code(500).send(error);
  }
}

export async function getUser(req, replay) {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
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
