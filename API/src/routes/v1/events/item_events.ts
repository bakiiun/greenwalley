import { Request, Response, NextFunction } from "express";
import event from "../../../modules/database/abstract_objects/methods";
import clientDTO from "../../../modules/dto/client_dto";
import moment from "moment";

const itemListOfApart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbResult = await event.itemListOfApart({ apartID: Number(req.params.apartID) });
    res.status(200).json(dbResult);
  } catch (error: any) {
    throw next({ event: "Item Events - itemListOfApart", message: "Eşya listesi oluşturulurken hata meydana geldi.", errorMsg: error.message });
  }
};

const itemCreate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { itemName } = new clientDTO(req.body);
    const itemGivenDate = new Date()
    await event.itemCreate({ itemName, itemGivenDate, apartID: Number(req.params.apartID) });
    res.status(201).json({ message: "Eşya oluşturuldu." });
  } catch (error: any) {
    throw next({ event: "Item Events - itemCreate", message: "Eşya oluşturulurken bir hata meydana geldi.", errorMsg: error.message });
  }
};

const itemDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await event.itemDelete({ itemID: Number(req.params.itemID) });
    return res.status(200).json({ message: "Eşya silindi." });
  } catch (error: any) {
    throw next({ event: "Item Events - itemDelete", message: "Eşya silinirken bir hata meydana geldi.", errorMsg: error.message });
  }
};

export default { itemListOfApart, itemCreate, itemDelete };
