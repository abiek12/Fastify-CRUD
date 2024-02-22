import Fastify from "fastify";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

//Instance of fastify
const fastify = Fastify({
  logger: true,
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
