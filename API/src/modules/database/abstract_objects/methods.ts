import { IDB } from "./interface";
import { selectDB } from "../db_selector";

//* PERSONALS

const personalShow = (payload: { username: String }) => {
  const method = (db: IDB, payload: { username: String }) => {
    return db.personalShow(payload.username);
  };
  return method(selectDB(), { username: payload.username });
};

const personalUpdate = (payload: { personalID: Number; pwd: String }) => {
  const method = (db: IDB, payload: { personalID: Number; pwd: String }) => {
    return db.personalUpdate(payload.personalID, payload.pwd);
  };

  return method(selectDB(), { personalID: payload.personalID, pwd: payload.pwd });
};

//* DASHBOARD

const customerInfo = () => {
  const method = (db: IDB) => {
    return db.customerInfo();
  };

  return method(selectDB());
};

const invoiceDailyList = () => {
  const method = (db: IDB) => {
    return db.invoiceDailyList();
  };

  return method(selectDB());
};

//* APARTS

const apartList = () => {
  const method = (db: IDB) => {
    return db.apartList();
  };
  return method(selectDB());
};

const apartShow = (payload: { apartID: Number }) => {
  const method = (db: IDB, payload: { apartID: Number }) => {
    return db.apartShow(payload.apartID);
  };

  return method(selectDB(), { apartID: payload.apartID });
};

const apartCreate = (payload: { apartName: String; apartType: Boolean; apartRoomCount: Number }) => {
  const method = (db: IDB, payload: { apartName: String; apartType: Boolean; apartRoomCount: Number }) => {
    return db.apartCreate(payload.apartName, payload.apartType, payload.apartRoomCount);
  };
  return method(selectDB(), { apartName: payload.apartName, apartType: payload.apartType, apartRoomCount: payload.apartRoomCount });
};

const apartUpdate = (payload: { apartID: Number; apartName: String; apartType: Boolean; apartRoomCount: Number }) => {
  const method = (db: IDB, payload: { apartID: Number; apartName: String; apartType: Boolean; apartRoomCount: Number }) => {
    return db.apartUpdate(payload.apartID, payload.apartName, payload.apartType, payload.apartRoomCount);
  };

  return method(selectDB(), {
    apartID: payload.apartID,
    apartName: payload.apartName,
    apartType: payload.apartType,
    apartRoomCount: payload.apartRoomCount,
  });
};

const apartDelete = (payload: { apartID: Number }) => {
  const method = (db: IDB, payload: { apartID: Number }) => {
    return db.apartDelete(payload.apartID);
  };

  return method(selectDB(), { apartID: payload.apartID });
};

//* ITEMS

const itemListOfApart = (payload: { apartID: Number }) => {
  const method = (db: IDB, payload: { apartID: Number }) => {
    return db.itemListOfApart(payload.apartID);
  };
  return method(selectDB(), { apartID: payload.apartID });
};

const itemCreate = (payload: { apartID: Number; itemName: String; itemGivenDate: Date }) => {
  const method = (db: IDB, payload: { apartID: Number; itemName: String; itemGivenDate: Date }) => {
    return db.itemCreate(payload.apartID, payload.itemName, payload.itemGivenDate);
  };
  return method(selectDB(), { apartID: payload.apartID, itemName: payload.itemName, itemGivenDate: payload.itemGivenDate });
};

const itemDelete = (payload: { itemID: Number }) => {
  const method = (db: IDB, payload: { itemID: Number }) => {
    return db.itemDelete(payload.itemID);
  };
  return method(selectDB(), { itemID: payload.itemID });
};

//* CUSTOMERS

const customerList = () => {
  const method = (db: IDB) => {
    return db.customerList();
  };

  return method(selectDB());
};

const customerShow = (payload: { customerID: Number }) => {
  const method = (db: IDB, payload: { customerID: Number }) => {
    return db.customerShow(payload.customerID);
  };

  return method(selectDB(), { customerID: payload.customerID });
};

const customerCreate = (payload: {
  customerName: String;
  customerPhone: String;
  identityNumber: Number;
  contractDate: Date;
  contractLength: Number;
  apartID: Number;
  cost: Number;
}) => {
  const method = (
    db: IDB,
    payload: {
      customerName: String;
      customerPhone: String;
      identityNumber: Number;
      contractDate: Date;
      contractLength: Number;
      apartID: Number;
      cost: Number;
    }
  ) => {
    return db.customerCreate(
      payload.customerName,
      payload.customerPhone,
      payload.identityNumber,
      payload.contractDate,
      payload.contractLength,
      payload.apartID,
      payload.cost
    );
  };

  return method(selectDB(), {
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
    identityNumber: payload.identityNumber,
    contractDate: payload.contractDate,
    contractLength: payload.contractLength,
    apartID: payload.apartID,
    cost: payload.cost,
  });
};

const customerUpdate = (payload: { customerID: Number; identityNumber: String; customerName: String; customerPhone: String }) => {
  const method = (db: IDB, payload: { customerID: Number; identityNumber: String; customerName: String; customerPhone: String }) => {
    return db.customerUpdate(payload.customerID, payload.identityNumber, payload.customerName, payload.customerPhone);
  };

  return method(selectDB(), {
    customerID: payload.customerID,
    identityNumber: payload.identityNumber,
    customerName: payload.customerName,
    customerPhone: payload.customerPhone,
  });
};

const customerEndContract = (payload: { customerID: Number }) => {
  const method = (db: IDB, payload: { customerID: Number }) => {
    return db.customerEndContract(payload.customerID);
  };

  return method(selectDB(), { customerID: payload.customerID });
};

//* INVOICES

const invoiceList = () => {
  const method = (db: IDB) => {
    return db.invoiceList();
  };
  return method(selectDB());
};

const invoiceListOfCustomer = (payload: { customerID: Number }) => {
  const method = (db: IDB, payload: { customerID: Number }) => {
    return db.invoiceListOfCustomer(payload.customerID);
  };
  return method(selectDB(), { customerID: payload.customerID });
};

const invoicePay = (payload: { invoiceID: Number }) => {
  const method = (db: IDB, payload: { invoiceID: Number }) => {
    return db.invoicePay(payload.invoiceID);
  };
  return method(selectDB(), { invoiceID: payload.invoiceID });
};

export default {
  personalShow,
  personalUpdate,
  customerInfo,
  invoiceDailyList,
  apartList,
  apartShow,
  apartCreate,
  apartUpdate,
  apartDelete,
  customerList,
  customerShow,
  customerCreate,
  customerUpdate,
  customerEndContract,
  itemListOfApart,
  itemCreate,
  itemDelete,
  invoiceList,
  invoiceListOfCustomer,
  invoicePay,
};
