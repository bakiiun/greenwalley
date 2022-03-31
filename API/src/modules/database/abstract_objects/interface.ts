export interface IDB {
  personalList(): any;
  personalShow(username: String): any;
  personalCreate(username: String, pwd: String, cellPhone: String): any;
  personalUpdate(id: Number, username: String, pwd: String, cellPhone: String): any;
  personalDelete(id: Number): any;
}
