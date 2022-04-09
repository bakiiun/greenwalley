import { Request, Response, NextFunction } from "express";

//! "req:any" :(
export const gate = (req: any, res: Response, next: NextFunction) => {
  res.status(200).json(req.userSession);
};
