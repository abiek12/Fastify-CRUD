import Fastify from "fastify";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import Mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 3000;

//Instance of fastify
const fastify = Fastify({
  logger: true,
});

// Connect to db
Mongoose.connect("mongodb://localhost:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Routes
fastify.register(userRoutes, { prefix: "/api/user" });

// Start my server
try {
  fastify.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
