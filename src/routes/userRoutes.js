import {
  createUser,
  logIn,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
import { auth } from "../middlewares/auth.js";

const userCreateSchema = {
  schema: {
    body: {
      type: "object",
      properties: {
        Username: { type: "string", minLength: 5 },
        Email: { type: "string", format: "email" },
        Password: { type: "string" },
      },
      required: ["Username", "Email", "Password"],
    },
  },
};

async function userRoutes(fastify, options, done) {
  // Registraion
  fastify.post("/signup", createUser);
  // Login
  fastify.post("/login", logIn);
  //Get user info
  fastify.get("/:id", { preHandler: auth }, getUser);
  // Update
  fastify.put("/:id", { preHandler: auth }, updateUser);
  // Delete
  fastify.delete("/:id", { preHandler: auth }, deleteUser);
  done();
}
export default userRoutes;
