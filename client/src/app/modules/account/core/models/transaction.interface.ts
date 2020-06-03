import { BankTypes } from './bank-types.enum';

export class Transaction {
  id: string;
  time: number;
  description: string;
  mcc: string;
  amount: number;
  balance: number;
  user: string;
  type: BankTypes;
}
