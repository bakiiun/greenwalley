import { Request, Response, NextFunction } from "express";
import event from "../../../modules/database/abstract_objects/methods";
import clientDTO from "../../../modules/dto/client_dto";

const invoiceList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbResult = await event.invoiceList();
    res.status(200).json(dbResult);
  } catch (error: any) {
    throw next({ event: "Invoice Events - invoiceList", message: "Fatura listesi oluşturulurken bir hata meydana geldi.", errorMsg: error.message });
  }
};

const invoiceListOfCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbResult = await event.invoiceListOfCustomer({ customerID: Number(req.params.customerID) });
    res.status(200).json(dbResult);
  } catch (error: any) {
    throw next({
      event: "Invoice Events - invoiceListOfCustomer",
      message: "Fatura listesi oluşturulurken bir hata meydana geldi.",
      errorMsg: error.message,
    });
  }
};

const invoicePay = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { invoiceID } = new clientDTO(req.body);
    await event.invoicePay({ invoiceID });
    res.status(200).json({ message: "Fatura ödendi." });
  } catch (error: any) {
    throw next({
      event: "Invoice Events - invoicePay",
      message: "Fatura ödeme işlemi yapılırken bir hata meydana geldi.",
      errorMsg: error.message,
    });
  }
};

export default { invoiceList, invoiceListOfCustomer, invoicePay };
