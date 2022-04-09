import { Request, Response, NextFunction } from "express";
import event from "../../../modules/database/abstract_objects/methods";
import clientDTO from "../../../modules/dto/client_dto";

const apartList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbResult = await event.apartList();
    return res.status(200).json(dbResult);
  } catch (error: any) {
    throw next({ event: "Apart Events - apartList", message: "Daire listesi oluşturulurken hata meydana geldi.", errorMsg: error.message });
  }
};

const apartShow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbResult = await event.apartShow({ apartID: Number(req.params.apartID) });
    return res.status(200).json(dbResult[0]);
  } catch (error: any) {
    throw next({ event: "Apart Events - apartShow", message: "Daire bilgileri oluşturulurken hata meydana geldi.", errorMsg: error.message });
  }
};

const apartCreate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { apartName, apartType, apartRoomCount } = new clientDTO(req.body);
    await event.apartCreate({ apartName, apartType, apartRoomCount });
    return res.status(201).json({ message: "Daire oluşturuldu." });
  } catch (error: any) {
    throw next({ event: "Apart Events - apartCreate", message: "Daire oluşturulurken bir hata meydana geldi.", errorMsg: error.message });
  }
};

const apartUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { apartID, apartName, apartType, apartRoomCount } = new clientDTO(req.body);
    await event.apartUpdate({ apartID, apartName, apartType, apartRoomCount });
    res.status(200).json({ message: "Daire güncellendi." });
  } catch (error: any) {
    throw next({ event: "Apart Events - apartUpdate", message: "Daire güncellenirken bir hata meydana geldi.", errorMsg: error.message });
  }
};

const apartDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await event.apartDelete({ apartID: Number(req.params.apartID) });
    res.status(200).json({ message: "Daire silindi." });
  } catch (error: any) {
    throw next({ event: "Apart Events - apartDelete", message: "Daire silinirken bir hata meydana geldi.", errorMsg: error.message });
  }
};

export default { apartList, apartShow, apartCreate, apartUpdate, apartDelete };
