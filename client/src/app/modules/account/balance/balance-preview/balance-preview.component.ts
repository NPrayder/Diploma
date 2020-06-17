import { Component, OnDestroy, OnInit } from '@angular/core';
import { BalanceService } from '../core/services/balance.service';
import { Balance } from '../core/models/balance.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-balance-preview',
  templateUrl: './balance-preview.component.html',
  styleUrls: ['./balance-preview.component.scss']
})
export class BalancePreviewComponent implements OnInit, OnDestroy {
  balances: Balance[];
  subscription: Subscription;

  constructor(public balanceService: BalanceService) {
  }

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.initSubscription();
  }

  initSubscription(): void {
    this.subscription.add(this.balanceService.getBalance()
      .subscribe((balance: Balance[]) => this.balances = balance));
  }

  getBalance(balance: Balance): string {
    return `${balance.balance / 100} ${balance.currency}`;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
