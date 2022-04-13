import { Request, Response, NextFunction } from "express";
import event from "../../../modules/database/abstract_objects/methods";

const customerInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customerInfo = await event.customerInfo();
    return res.status(200).json(customerInfo[0]);
  } catch (error: any) {
    throw next({
      event: "Dashboard Events - customerInfo",
      message: "Bilgiler oluşturulurken hata meydana geldi.",
      errorMsg: error.message,
    });
  }
};

export default { customerInfo };
