import express from "express";
import { tokenCheck, isAdmin } from "../../middleware/token_check";
import personal from "./events/personal_events";
import dashboard from "./events/dashboard_events";
import apart from "./events/apart_events";
import customer from "./events/customer_events";
import item from "./events/item_events";
import invoice from "./events/invoice_events";
import { gate } from "./events/gate";
import { verify } from "../../middleware/validate_payload";
import rule from "../../modules/joi/rules";

const router = express.Router();

router.post("/", (req, res, next) => {
  res.status(200).json(req.body);
});

router.get("/gate", tokenCheck, gate);
router.post("/login", verify(rule.login), personal.login);
router.patch("/personals", tokenCheck, isAdmin, verify(rule.pwd), personal.personalUpdate);

//* DASHBOARD ROUTES

router.get("/customer_info", tokenCheck, dashboard.customerInfo);

//* APART ROUTES

router.get("/aparts", tokenCheck, apart.apartList);
router.post("/aparts", tokenCheck, verify(rule.apart), apart.apartCreate);
router.get("/aparts/:apartID", tokenCheck, apart.apartShow);
router.put("/aparts/:apartID", tokenCheck, verify(rule.apart), apart.apartUpdate);
router.delete("/aparts/:apartID", tokenCheck, apart.apartDelete);

//* CUSTOMER ROUTES

router.get("/customers", tokenCheck, isAdmin, customer.customerList);
router.get("/customers/:customerID", tokenCheck, isAdmin, customer.customerShow);
router.post("/customers", tokenCheck, verify(rule.customer), customer.customerCreate);
router.put("/customers/:customerID", tokenCheck, isAdmin, verify(rule.customerUpdate), customer.update);
router.patch("/customers/:customerID", tokenCheck, customer.endContract);

//* ITEM ROUTES

router.get("/aparts/:apartID/items", tokenCheck, item.itemListOfApart);
router.post("/aparts/:apartID/items", tokenCheck, verify(rule.item), item.itemCreate);
router.delete("/aparts/:apartID/items/:itemID", tokenCheck, item.itemDelete);

//* INVOICE ROUTES

router.get("/invoices", tokenCheck, invoice.invoiceList);
router.get("/aparts/:customerID/invoices", tokenCheck, invoice.invoiceListOfCustomer);
router.patch("/aparts/:customerID/invoices/:invoiceID", tokenCheck, invoice.invoicePay);

export default router;
