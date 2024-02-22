function userRoutes(fastify, options, done) {
  //GET Login
  fastify.get("/login", (req, replay) => {
    replay.code(200).send("Login page");
  });
  done();
}
export default userRoutes;
