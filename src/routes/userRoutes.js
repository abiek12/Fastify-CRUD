import { getUser,createUser,updateUser,deleteUser } from "../controllers/userControllers.js";
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
  fastify.post("/", createUser);
  // Login
  fastify.get("/:id", getUser);
  // Update
  fastify.put("/:id", updateUser);
  // Delete
  fastify.delete("/:id", deleteUser);
  done();
}
export default userRoutes;
