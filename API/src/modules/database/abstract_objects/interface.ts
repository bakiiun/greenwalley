export interface IDB {
  //* PERSONALS

  personalShow(username: String): any;
  personalUpdate(personalID: Number, pwd: String): any;

  //* DASHBOARD

  customerInfo(): any;
  invoiceDailyList(): any;

  //* APARTS

  apartList(): any;
  apartShow(apartID: Number): any;
  apartCreate(apartName: String, apartType: Boolean, apartRoomCount: Number): any;
  apartUpdate(apartID: Number, apartName: String, apartType: Boolean, apartRoomCount: Number): any;
  apartDelete(apartID: Number): any;

  //* CUSTOMERS

  customerList(): any;
  customerShow(customerID: Number): any;
  customerCreate(
    customerName: String,
    customerPhone: String,
    identityNumber: Number,
    contractDate: Date,
    contractLength: Number,
    apartID: Number,
    cost: Number
  ): any;
  customerEndContract(customerID: Number): any;
  customerUpdate(customerID: Number, identityNumber: String, customerName: String, customerPhone: String): any;

  //* ITEMS

  itemListOfApart(apartID: Number): any;
  itemCreate(apartID: Number, itemName: String, itemGivenDate: Date): any;
  itemDelete(itemID: Number): any;

  //* INVOICES

  invoiceList(): any;
  invoiceListOfCustomer(customerID: Number): any;
  invoicePay(invoiceID: Number): any;
}
