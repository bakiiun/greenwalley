import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../../configs/config";
import events from "../../../modules/database/abstract_objects/methods";
import clientDTO from "../../../modules/dto/client_dto";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, pwd } = new clientDTO(req.body);
    const [dbResult] = await events.personalShow({ username });
    if (dbResult) {
      const encPwd = await bcrypt.compare(pwd, String(dbResult.pwd));
      if (encPwd) {
        const token = jwt.sign({ personalID: dbResult.personal_id, username: dbResult.username, type: dbResult.type }, String(config.jwt.secretKey), {
          algorithm: "RS256",
          // expiresIn: "1h",
        });

        return res.status(200).json({ token });
      } else {
        return res.status(400).json({ message: "Kullanıcı ID veya şifre yanlış." });
      }
    } else {
      return res.status(400).json({ message: "Kullanıcı ID veya şifre yanlış." });
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

const personalUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { personalID, pwd } = new clientDTO(req.body);
    var encPwd = await bcrypt.hash(pwd, Number(config.bcrypt.hash));
    await events.personalUpdate({ personalID, pwd: encPwd });

    return res.status(200).json({ message: "Personel bilgileri güncellendi." });
  } catch (error: any) {
    throw next({ event: "Personal Events - personalUpdate", message: "Personel güncellenirken bir hata meydana geldi.", errorMsg: error.message });
  }
};

const deletePersonal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { personalID } = new clientDTO(req.body);
    await events.personalDelete({ personalID });
    return res.status(200).json({ message: "Personel silindi." });
  } catch (error: any) {
    throw next({ event: "Personal Events - deletePersonal", message: "Personel silinirken bir hata meydana geldi.", errorMsg: error.message });
  }
};

export default { login, personalList, showPersonal, createPersonal, personalUpdate, deletePersonal };
