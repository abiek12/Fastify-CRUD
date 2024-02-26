import jsonwebtoken from "jsonwebtoken";

export async function auth(req, replay) {
  const token = req.cookie.token;
  console.log(token);
  console.log("Middleware");
  if (!token) {
    replay.code(401).send("You Have o login");
  } else {
    try {
      const decode = await jsonwebtoken.verify(token, "AB123");
      req.user = decode;
    } catch (error) {
      console.log(error);
      replay.code(403).send(error);
    }
  }
}
