import { BankTypes } from '../../../core/models/bank-types.enum';

export class Balance {
  currency: string;
  balance: number;
  creditLimit: number;
  cardNum: string;
  type: BankTypes;
}
