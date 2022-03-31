import { IDB } from "../abstract_objects/interface";
import { dbQuery, dbConnect as db } from "./query_module";
import moment from "moment";

export class MySQL implements IDB {
  //* PERSONALS

  personalList() {
    return dbQuery("SELECT * FROM personals");
  }

  personalShow(username: String) {
    return dbQuery("SELECT * FROM personals WHERE username=?", [username]);
  }

  personalCreate(username: String, pwd: String, phone: String) {
    return dbQuery("INSERT INTO personals (username, pwd, phone) VALUES (?, ?, ?)", [username, pwd, phone]);
  }

  personalUpdate(id: Number, username: String, pwd: String, phone: String) {
    if (pwd) {
      return dbQuery("UPDATE personals SET username=?, pwd=?, phone=? WHERE (personal_id=?)", [username, pwd, phone, id]);
    } else {
      return dbQuery("UPDATE personals SET username=?, phone=? WHERE (personal_id=?)", [username, phone, id]);
    }
  }

  personalDelete(id: Number) {
    return dbQuery("DELETE FROM personals WHERE (personal_id = ?)", [id]);
  }

  //* APARTS

  apartList() {
    return dbQuery("SELECT * FROM aparts");
  }

  apartShow(id: Number) {
    return dbQuery("SELECT * FROM aparts WHERE apart_id=?", [id]);
  }

  apartCreate(name: String, apartRoomCount: Number) {
    return dbQuery("INSERT INTO aparts (apart_name, apart_room_count) VALUES (?, ?)", [name, apartRoomCount]);
  }

  apartUpdate(id: Number, name: String, apartRoomCount: Number) {
    return dbQuery("UPDATE aparts SET apart_name=?, apart_room_count=? WHERE (apart_id=?)", [name, apartRoomCount, id]);
  }
  apartDelete(id: Number) {
    return dbQuery("DELETE FROM aparts WHERE (apart_id=?)", [id]);
  }

  //* ITEMS

  itemList() {
    return dbQuery("SELECT * FROM apart_items");
  }

  itemShowOfApart(id: Number) {
    return dbQuery("SELECT * FROM apart_items WHERE apart_id=?", [id]);
  }

  itemCreate(name: String, apartID: Number) {
    return dbQuery("INSERT INTO apart_items (item_name, apart_id) VALUES (?, ?)", [name, apartID]);
  }

  itemUpdate(id: Number, name: String) {
    return dbQuery("UPDATE apart_items SET item_name=? WHERE (item_id=?)", [name, id]);
  }
  itemDelete(id: Number) {
    return dbQuery("DELETE FROM apart_items WHERE (item_id=?)", [id]);
  }

  //* CUSTOMERS

  customerList() {
    return dbQuery("SELECT * FROM customers");
  }

  customerShow(id: String) {
    return dbQuery("SELECT * FROM customers WHERE customer_id=?", [id]);
  }

  customerCreate(name: String, phone: String, idNumber: Number, conntractDate: Date, contractLength: Number, apartID: Number, cost: Number) {
    /*//
    //! BURASI ÖZELLİKLE KONTROL EDİLMELİ
    */

    var invoiceList: any[];

    return db.beginTransaction((error) => {
      if (error) {
        throw error;
      }

      db.query(
        "INSERT INTO customers (customer_name, customer_phone, identity_number, contract_date, monthly_contract_length, apart_id) VALUES (?, ?, ?, ?)",
        [name, phone, idNumber, conntractDate, contractLength, apartID],
        (error, customerResult, customerFields) => {
          if (error) {
            return db.rollback(function () {
              throw error;
            });
          }

          for (let i = 0; i < contractLength; i++) {
            invoiceList.push([moment(conntractDate, "YYYY-MM-DD").add(i, "M").format("YYYY-MM-DD"), cost, customerResult.insertId]);
          }

          db.query("INSERT INTO invoices (invoice_date, cost, customer_id) VALUES ?", [invoiceList], (error, invoiceResult, invoiceFields) => {
            if (error) {
              return db.rollback(function () {
                throw error;
              });
            } else {
              console.log("createUser complated.");
              return true;
            }
          });
        }
      );
    });
  }

  customerUpdate(id: Number, name: String, phone: String, idNumber: Number) {
    return dbQuery("UPDATE customers SET customer_name=?, customer_phone=?, identity_number=? WHERE (customer_id=?)", [name, phone, idNumber, id]);
  }

  customerDelete(id: Number) {
    return dbQuery("UPDATE customers SET status=false WHERE (customer_id=?)", [id]);
  }

  //* INVOICES

  invoiceList() {
    return dbQuery("SELECT * FROM invoices");
  }

  invoiceofCustomer(id: Number) {
    return dbQuery("SELECT * FROM invoices WHERE customer_id=?", [id]);
  }

  invoiceCreate(date: Date, cost: Number, customerID: Number) {
    return dbQuery("INSERT INTO invoices (invoice_date, cost, customer_id) VALUES ?", [date, cost, customerID]);
  }

  invoicePay(id: Number) {
    return dbQuery("UPDATE invoices SET status=1 WHERE invoice_id=?", [id]);
  }

  invoiceDelete(id: Number) {
    return dbQuery("DELETE FROM invoices WHERE (invoice_id=?)", [id]);
  }
}
