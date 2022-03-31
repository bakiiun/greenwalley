import mysql from "mysql";
import config from "../../../configs/config";

export const dbConnect = mysql.createConnection(config.mysql.uri);

export function dbQuery(query: String, params?: any): any {
  return new Promise((resolve, reject): any => {
    dbConnect.query(String(query), params, (error, result): any => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
