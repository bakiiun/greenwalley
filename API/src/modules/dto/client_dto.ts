class ClientDTO {
  [x: string]: any;
  constructor(data: any) {
    this.username = data.username;
    this.pwd = data.pwd;
    this.cellPhone = data.cellPhone;
  }
}

export default ClientDTO;
