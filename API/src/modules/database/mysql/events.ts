import { IDB } from "../abstract_objects/interface";
import { dbQuery, dbConnect as db } from "./query_module";
import moment from "moment";

export class MySQL implements IDB {
  //* PERSONALS

  personalShow(username: String) {
    return dbQuery("SELECT * FROM personals WHERE username=?", [username]);
  }

  personalUpdate(personalID: Number, pwd: String) {
    return dbQuery("UPDATE personals SET pwd=? WHERE (personal_id=?)", [pwd, personalID]);
  }

  //* DASHBOARD

  customerInfo() {
    return dbQuery(
      "SELECT (SELECT COUNT(*) FROM customers) AS 'totalCustomer', (SELECT COUNT(*) FROM customers WHERE status=1) AS 'activeCustomer' FROM customers LIMIT 1"
    );
  }

  //* APARTS

  apartList() {
    return dbQuery(
      "SELECT aparts.apart_id AS apartID, aparts.apart_name AS apartName, aparts.apart_type AS apartType, aparts.apart_room_count AS apartRoomCount, customers.customer_id AS customerID, customers.customer_name AS customerName, customers.customer_phone AS customerPhone, customers.identity_number AS identityNumber, customers.contract_date AS contractDate, customers.monthly_contract_length AS contractLength FROM aparts LEFT JOIN customers ON aparts.apart_id = customers.apart_id AND customers.status = 1 ORDER BY aparts.apart_name ASC"
    );
  }

  apartShow(apartID: Number) {
    return dbQuery(
      "SELECT aparts.apart_id AS apartID, aparts.apart_name AS apartName, aparts.apart_type AS apartType, aparts.apart_room_count AS apartRoomCount, customers.customer_id AS customerID, customers.customer_name AS customerName, customers.customer_phone AS customerPhone, customers.identity_number AS identityNumber, customers.contract_date AS contractDate, customers.monthly_contract_length AS contractLength FROM aparts LEFT JOIN customers ON aparts.apart_id = customers.apart_id AND customers.status =1 WHERE aparts.apart_id=?",
      [apartID]
    );
  }

  apartCreate(apartName: String, apartType: Boolean, apartRoomCount: Number) {
    return dbQuery("INSERT INTO aparts (apart_name, apart_type, apart_room_count) VALUES (?, ?, ?)", [apartName, apartType, apartRoomCount]);
  }

  apartUpdate(apartID: Number, apartName: String, apartType: Boolean, apartRoomCount: Number) {
    return dbQuery("UPDATE aparts SET apart_name=?, apart_type=?, apart_room_count=? WHERE (apart_id=?)", [
      apartName,
      apartType,
      apartRoomCount,
      apartID,
    ]);
  }

  apartDelete(apartID: Number) {
    return dbQuery("DELETE FROM aparts WHERE (apart_id=?)", [apartID]);
  }

  //* ITEMS

  itemListOfApart(apartID: Number) {
    return dbQuery("SELECT item_id AS itemID, item_name AS itemName, item_given_date AS itemGivenDate FROM apart_items WHERE apart_id=?", [apartID]);
  }

  itemCreate(apartID: Number, itemName: String, itemGivenDate: Date) {
    return dbQuery("INSERT INTO apart_items (item_name, item_given_date, apart_id) VALUES (?, ?, ?)", [itemName, itemGivenDate, apartID]);
  }

  itemDelete(itemID: Number) {
    return dbQuery("DELETE FROM apart_items WHERE (item_id=?)", [itemID]);
  }

  //* CUSTOMERS

  customerCreate(
    customerName: String,
    customerPhone: String,
    identityNumber: Number,
    contractDate: Date,
    contractLength: Number,
    apartID: Number,
    cost: Number
  ) {
    return db.beginTransaction((err1) => {
      if (err1) {
        return db.rollback(() => {
          throw err1;
        });
      } else {
        return db.query(
          "INSERT INTO customers (customer_name, customer_phone, identity_number, contract_date, monthly_contract_length, apart_id) VALUES (?, ?, ?, ?, ?, ?)",
          [customerName, customerPhone, identityNumber, contractDate, contractLength, apartID],
          (err2, customerResult, fields) => {
            if (err2) {
              return db.rollback(() => {
                throw err2;
              });
            } else {
              var invoiceList = [];

              for (let i = 0; i < contractLength; i++) {
                invoiceList.push([moment(contractDate, "YYYY-MM-DD").add(i, "M").format("YYYY-MM-DD"), cost, 0, customerResult.insertId]);
              }

              return db.query(
                "INSERT INTO invoices (invoice_date, cost, status, customer_id) VALUES ?",
                [invoiceList],
                (err3, invoiceResult, fields) => {
                  if (err3) {
                    return db.rollback(() => {
                      throw err3;
                    });
                  } else {
                    return db.commit((err4) => {
                      if (err4) {
                        return db.rollback(() => {
                          throw err4;
                        });
                      } else {
                        return "ok";
                      }
                    });
                  }
                }
              );
            }
          }
        );
      }
    });
  }

  customerUpdate(customerID: Number, identityNumber: String, customerName: String, customerPhone: String) {
    return dbQuery("UPDATE customers SET customer_name=?, customer_phone=?, identity_number=? WHERE (customer_id=?)", [
      customerName,
      customerPhone,
      identityNumber,
      customerID,
    ]);
  }

  customerList() {
    return dbQuery(
      "SELECT customer_id AS customerID, customer_name AS customerName, customer_phone AS customerPhone, identity_number AS identityNumber, contract_date AS contractDate, monthly_contract_length AS contractLength, status, apart_id AS apartID FROM customers"
    );
  }

  customerShow(customerID: Number) {
    return dbQuery("SELECT * FROM customers WHERE customer_id=?", [customerID]);
  }

  customerEndContract(customerID: Number) {
    return dbQuery("UPDATE customers SET status=false WHERE (customer_id=?)", [customerID]);
  }

  //* INVOICES

  invoiceList() {
    return dbQuery(
      "SELECT invoice_id AS 'invoiceID', invoice_date AS 'invoiceDate', cost, status, customer_id AS 'customerID' FROM invoices WHERE status=0"
    );
  }

  invoiceListOfCustomer(customerID: Number) {
    return dbQuery("SELECT * FROM invoices WHERE customer_id=?", [customerID]);
  }

  invoicePay(invoiceID: Number) {
    return dbQuery("UPDATE invoices SET status=1 WHERE invoice_id=?", [invoiceID]);
  }

  invoiceDelete(id: Number) {
    return dbQuery("DELETE FROM invoices WHERE (invoice_id=?)", [id]);
  }
}
