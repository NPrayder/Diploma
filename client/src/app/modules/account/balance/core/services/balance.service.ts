import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Balance } from '../models/balance.interface';
import { environment } from '../../../../../../environments/environment';
import { BankTypes } from '../../../core/models/bank-types.enum';
import { SpinnerService } from '../../../../../shared/core/services/spinner.service';
import { FlowStats } from '../../../../../shared/core/models/flow-stats.interface';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  balance$: ReplaySubject<Balance[]>;

  constructor(private httpClient: HttpClient,
              private spinnerService: SpinnerService) {
    this.balance$ = new ReplaySubject<Balance[]>(1);
    this.requestBalance()
      .subscribe(((balance: Balance[]) => {
        this.balance$.next(balance);
        this.spinnerService.hideSpinner();
      }));
  }

  getBalance(): Observable<Balance[]> {
    return this.balance$.asObservable();
  }

  requestBalance(bankName?: string): Observable<Balance[]> {
    // this.spinnerService.showSpinner();
    return this.httpClient.get<Balance[]>(`${environment.balanceURL}?bank=${bankName}`);
  }

  requestMonetFlowStats(cardNum: string): Observable<FlowStats> {
    const currentDate = new Date().setDate(1);
    const startDate = new Date(currentDate).toLocaleString().split(',')[0];
    return this.httpClient.get<FlowStats>(`${environment.statsURL}?cardNum=${cardNum}&startDate=${startDate}`);
  }

  getBankSystemLogo(item: Balance): string {
    return item.cardNum.toString()[0] === '5' ? 'mastercard-logo.svg' : 'visa-logo.png';
  }

  getBankLogo(item: Balance): string {
    return item.type === BankTypes.MONOBANK ? 'mono-brand-logo.png' : 'privat-brand-logo.png';
  }

  normalizeCardNum(cardNum: string): string {
    return cardNum
      .toString()
      .replace('*', '*'.repeat(16 - cardNum.length + 1));
  }
}
