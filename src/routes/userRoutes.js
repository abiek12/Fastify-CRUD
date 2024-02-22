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

function userRoutes(fastify, options, done) {
  // GET Registration
  fastify.get("/signup", (req, replay) => {
    replay.code(200).send("Login page");
  });
  // POST Registration
  fastify.post("/signup", async (req, replay) => {
    try {
      const { username, email, password } = req.body;
      if (!(username && email && password)) {
        replay.code(400).send("All Fields are compulsorry!");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  });
  //GET Login
  fastify.get("/login", (req, replay) => {
    replay.code(200).send("Login page");
  });
  // POST Login
  fastify.post("/login", userSchema, async (req, replay) => {
    try {
      const { username, password } = req.body;
      if (!(username && email && password)) {
        replay.code(400).send("All Fields are compulsorry!");
      } else {
        replay.code(200).send("Login Sucessfully");
      }
    } catch (error) {
      console.log(error);
    }
  });
  done();
}
export default userRoutes;
