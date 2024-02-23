import {
  createUser,
  logIn,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
const userSchema = {
  schema: {
    type: "object",
    properties: {
      username: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
    },
  },
};

async function userRoutes(fastify, options, done) {
  // Registraion
  fastify.post("/signup", createUser);
  // Login
  fastify.post("/login", logIn);
  //Get user info
  fastify.get("/:id", getUser);
  // Update
  fastify.put("/:id", updateUser);
  // Delete
  fastify.delete("/:id", deleteUser);
  done();
}
export default userRoutes;
