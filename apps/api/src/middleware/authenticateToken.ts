import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export default function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send();
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send();
    }

    req.user = user;
    next();
  });
}
