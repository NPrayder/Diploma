import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BalanceService } from '../core/services/balance.service';
import { Balance } from '../core/models/balance.interface';
import { Subscription } from 'rxjs';
import { FlowStats } from '../../../../shared/core/models/flow-stats.interface';

@Component({
  selector: 'app-balance-detail',
  templateUrl: './balance-detail.component.html',
  styleUrls: ['./balance-detail.component.scss']
})
export class BalanceDetailComponent implements OnInit, OnDestroy {
  currentBalance: Balance;
  subscription: Subscription;
  incomes = 0;
  expenses = 0;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public balanceService: BalanceService) { }

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.subscription.add(this.balanceService.getBalance()
      .subscribe(async (balances: Balance[]) => {
        this.currentBalance = balances.find(({cardNum}) => cardNum === this.route.snapshot.params.cardNum);

        if (!this.currentBalance) {
          await this.router.navigate(['/', 'not-found']);
        }
      }));

    this.subscription.add(this.balanceService.requestMonetFlowStats(this.route.snapshot.params.cardNum)
      .subscribe((flow: FlowStats) => {
        this.incomes = flow.incomes;
        this.expenses = flow.expenses;
      }));
  }

  getBalance(sum: number, needCorrection: boolean = true): string {
    return needCorrection ? `${sum / 100} ${this.currentBalance.currency}` : `${sum} ${this.currentBalance.currency}`;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
