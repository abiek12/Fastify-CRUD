import jsonwebtoken from "jsonwebtoken";

export async function auth(req, replay) {
  const token = req.cookies.token;
  if (!token) {
    replay.code(401).send("You've to login");
  } else {
    try {
      const decode = await jsonwebtoken.verify(token, "AB123");
      if (!decode) {
        replay.code(403).send("Inavlid token");
      } else {
        return (req.user = decode);
      }
    } catch (error) {
      console.log(error);
      replay.code(403).send(error);
    }
  }
}
