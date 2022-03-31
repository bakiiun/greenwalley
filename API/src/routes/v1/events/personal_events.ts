import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../configs/config";
import events from "../../../modules/database/abstract_objects/events";
import clientDTO from "../../../modules/dto/client_dto";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, pwd } = new clientDTO(req.body);
    const dbResult = await events.personalShow({ username });
    const [encPwd] = await Promise.all([await bcrypt.compare(pwd, String(dbResult.pwd))]);
    if (dbResult.length == 1 && encPwd) {
      const token = jwt.sign({ id: dbResult.id, username: dbResult.username, type: "admin" }, String(config.jwt.secretKey), {
        algorithm: "RS256",
        // expiresIn: "1h",
      });
      return res.status(200).json(token);
    } else {
      return res.status(404).json({ message: "Kullanıcı ID veya şifre yanlış." });
    }
  } catch (error: any) {
    throw next({ event: "Personal Events - login", message: "Giriş yaparken bir hata meydana geldi.", errorMsg: error.message });
  }
};

const personalList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbResult = await events.personalList();
    return res.status(200).json(dbResult);
  } catch (error: any) {
    throw next({ event: "Personal Events - personalList", message: "Bir hata meydana geldi.", errorMsg: error.message });
  }
};

const showPersonal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.params;
    const dbResult = await events.personalShow({ username });
    return res.status(200).json({ dbResult });
  } catch (error: any) {
    throw next({ event: "Personal Events - showPersonal", message: "Bir hata meydana geldi.", errorMsg: error.message });
  }
};

const createPersonal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, pwd, cellPhone } = new clientDTO(req.body);
    const encPwd = await bcrypt.hash(pwd, Number(config.bcrypt.hash));
    await events.personalCreate({ username, pwd: encPwd, cellPhone });
    return res.status(200).json({ message: "Personel oluşturuldu." });
  } catch (error: any) {
    throw next({ event: "Personal Events - createPersonal", message: "Personel oluşturulurken bir hata meydana geldi.", errorMsg: error.message });
  }
};

const updatePersonal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, username, pwd, cellPhone } = new clientDTO(req.body);
    var encPwd = pwd;
    if (pwd) {
      encPwd = await bcrypt.hash(pwd, Number(config.bcrypt.hash));
    }
    await events.personalUpdate({ id, username, pwd: encPwd, cellPhone });
    return res.status(200).json({ message: "Personel bilgileri güncellendi." });
  } catch (error: any) {
    throw next({ event: "Personal Events - updatePersonal", message: "Personel güncellenirken bir hata meydana geldi.", errorMsg: error.message });
  }
};

const deletePersonal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = new clientDTO(req.body);
    return res.status(200).json({ message: "Personel silindi." });
    return res;
  } catch (error: any) {
    throw next({ event: "Personal Events - deletePersonal", message: "Personel silinirken bir hata meydana geldi.", errorMsg: error.message });
  }
};

export default { login, personalList, showPersonal, createPersonal, updatePersonal, deletePersonal };