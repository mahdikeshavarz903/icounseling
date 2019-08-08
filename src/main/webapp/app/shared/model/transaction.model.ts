export interface ITransaction {
  id?: number;
  totalAmount?: number;
  status?: boolean;
  visitorId?: number;
}

export class Transaction implements ITransaction {
  constructor(public id?: number, public totalAmount?: number, public status?: boolean, public visitorId?: number) {
    this.status = this.status || false;
  }
}
