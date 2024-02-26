import {
  createUser,
  logIn,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers.js";
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
  fastify.post("/signup", userCreateSchema, createUser);
  // Login
  fastify.post("/login", logIn);
  //Get user info
  fastify.get("/:id", getUser);
  // Update
  fastify.put("/:id", userCreateSchema, updateUser);
  // Delete
  fastify.delete("/:id", userCreateSchema, deleteUser);
  done();
}
export default userRoutes;
