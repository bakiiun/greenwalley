class ClientDTO {
  [x: string]: any;
  constructor(data: any) {
    //* ID DTO

    this.id = data.id;

    //* CUSTOMER & PERSONAL DTO
    this.personalID = data.personalID;
    this.username = data.username;
    this.pwd = data.pwd;
    this.cellPhone = data.cellPhone;

    this.customerID = data.customerID;
    this.identityNumber = data.identityNumber;
    this.customerName = data.customerName;
    this.customerPhone = data.customerPhone;
    this.contractDate = data.contractDate;
    this.contractLength = data.contractLength;
    this.cost = data.cost;

    //* APART DTO

    this.apartID = data.apartID;
    this.apartName = data.apartName;
    this.apartType = data.apartType;
    this.apartRoomCount = data.apartRoomCount;

    //* ITEM DTO

    this.itemID = data.itemID;
    this.itemName = data.itemName;

    //* INVOICE DTO

    this.invoiceID = data.invoiceID;
  }
}

export default ClientDTO;
