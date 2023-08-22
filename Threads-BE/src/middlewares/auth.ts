import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer")) {
    return res.status(401).json({ error: "Belum login tong !" });
  }

  const tokens = token.split(" ")[1];
  console.log("ini tokens", tokens);

  try {
    const loginSession = jwt.verify(tokens, "inirahasia");
    console.log("ini di bagian session: ", loginSession);
    res.locals.loginSession = loginSession; // Data pengguna tersimpan dalam req.user
    next();
  } catch (err) {
    res.status(401).json({ error: "Token tidak valid" });
  }
};

export default verifyToken;
