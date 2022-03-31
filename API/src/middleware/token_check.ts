import jwt from "jsonwebtoken";
import config from "../configs/config";

export const tokenCheck = (req: any, res: any, next: any) => {
  try {
    req.userSession = jwt.verify(req.headers.token, String(config.jwt.publicKey));
    next();
  } catch (error) {
    res.status(401).json({ msg: "Yetkiniz yok!" });
  }
};

export const isAdmin = (req: any, res: any, next: any) => {
  try {
    if (req.userSession == "admin") {
      next();
    } else {
      throw "Yetkiniz yok!";
    }
  } catch (error) {
    res.status(401).json({ msg: "Yetkiniz yok!" });
  }
};
