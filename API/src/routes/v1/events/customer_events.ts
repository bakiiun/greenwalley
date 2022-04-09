import { Request, Response, NextFunction } from "express";
import event from "../../../modules/database/abstract_objects/methods";
import clientDTO from "../../../modules/dto/client_dto";

const customerList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbResult = await event.customerList();
    return res.status(200).json(dbResult);
  } catch (error: any) {
    throw next({
      event: "Customer Events - customerList",
      message: "Müşteri listesi oluşturulurken bir hata meydana geldi.",
      errorMsg: error.message,
    });
  }
};

const customerShow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbResult = await event.customerShow({ customerID: Number(req.params.customerID) });
    return res.status(200).json(dbResult[0]);
  } catch (error: any) {
    throw next({
      event: "Customer Events - customerShow",
      message: "Müşteri bilgileri oluşturulurken bir hata meydana geldi.",
      errorMsg: error.message,
    });
  }
};

const customerCreate = (req: Request, res: Response, next: NextFunction) => {
  try {
    var contractDate = new Date();
    const { customerName, customerPhone, identityNumber, contractLength, apartID, cost } = new clientDTO(req.body);
    event.customerCreate({ customerName, customerPhone, identityNumber, contractDate, contractLength, apartID, cost });
    return res.status(201).json({ message: "Müşteri oluşturuldu." });
  } catch (error: any) {
    throw next({ event: "Customer Events - customerCreate", message: "Müşteri oluşturulurken bir hata meydana geldi.", errorMsg: error.message });
  }
};

const endContract = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerID } = new clientDTO(req.body);
    event.customerEndContract({ customerID });
    return res.status(200).json({ message: "Müşteri sözleşmesi sonlandırıldı." });
  } catch (error: any) {
    throw next({ event: "Customer Events - endContract", message: "Bir hata meydana geldi.", errorMsg: error.message });
  }
};

const update = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customerID, identityNumber, customerName, customerPhone } = new clientDTO(req.body);
    event.customerUpdate({ customerID, identityNumber, customerName, customerPhone });
    return res.status(200).json({
      message: "Bilgiler Güncellendi.",
    });
  } catch (error: any) {
    throw next({ event: "Customer Events - update", message: "Müşteri güncellenirken bir hata meydana geldi.", errorMsg: error.message });
  }
};

export default { customerList, customerShow, customerCreate, update, endContract };
