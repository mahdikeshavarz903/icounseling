export interface ITransaction {
  id?: number;
  totalAmount?: number;
  status?: boolean;
  visitorId?: number;
}

export const defaultValue: Readonly<ITransaction> = {
  status: false
};
