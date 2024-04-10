import jwt from "jsonwebtoken";

const isLoggedInUser = (req, res, next) => {
  const tokenSecretKey = process.env.JWT_SECRET_KEY;
  // console.log(tokenSecretKey, "token secret key");
  let { authorization } = req.headers;

  authorization = authorization.split(" ")[1];
  // console.log(authorization, "authorization");

  if (!authorization) {
    return res.status(401).json({ message: "token not found" });
  }

  const decodedToken = jwt.verify(authorization, tokenSecretKey);
  // console.log(decodedToken.user_id, "decodedToken value");

  req.userId = decodedToken.user_id;

  // console.log(req);

  next();
};

export { isLoggedInUser };
