import { IDB } from "./interface";

const personalShow = (db: IDB, payload: { username: String }) => {
  return db.personalShow(payload.username);
};

const personalList = (db: IDB) => {
  return db.personalList();
};

const personalCreate = (db: IDB, payload: { username: String; pwd: String; cellPhone: String }) => {
  return db.personalCreate(payload.username, payload.pwd, payload.cellPhone);
};

const personalUpdate = (db: IDB, payload: { id: Number; username: String; pwd: String; cellPhone: String }) => {
  return db.personalUpdate(payload.id, payload.username, payload.pwd, payload.cellPhone);
};

const personalDelete = (db: IDB, payload: { id: Number }) => {
  return db.personalDelete(payload.id);
};

export default { personalList, personalShow, personalCreate, personalUpdate, personalDelete };
