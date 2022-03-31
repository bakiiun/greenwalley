import config from "../../configs/config";
import { MySQL } from "./mysql/events";

const DB_LIST = { MySQL };

export const selectDB = () => {
  switch (config.server.dbType) {
    case "mysql":
      return new DB_LIST.MySQL();
    default:
      return new DB_LIST.MySQL();
  }
};
