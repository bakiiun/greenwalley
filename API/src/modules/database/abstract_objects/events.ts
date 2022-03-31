import { selectDB } from "../db_selector";
import method from "./methods";

const personalShow = (payload: { username: String }) => {
  return method.personalShow(selectDB(), { username: payload.username });
};

const personalList = () => {
  return method.personalList(selectDB());
};

const personalCreate = (payload: { username: String; pwd: String; cellPhone: String }) => {
  return method.personalCreate(selectDB(), { username: payload.username, pwd: payload.pwd, cellPhone: payload.cellPhone });
};

const personalUpdate = (payload: { id: Number; username: String; pwd: String; cellPhone: String }) => {
  return method.personalUpdate(selectDB(), { id: payload.id, username: payload.username, pwd: payload.pwd, cellPhone: payload.cellPhone });
};

const personalDelete = (payload: { id: Number }) => {
  return method.personalDelete(selectDB(), { id: payload.id });
};

export default { personalList, personalShow, personalCreate, personalUpdate, personalDelete };
