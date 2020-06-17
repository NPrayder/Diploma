import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RateService } from '../core/services/rate.service';
import { Rate } from '../core/models/rate.interface';
import { Subscription } from 'rxjs';
import * as currencyCodes from 'currency-codes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.scss']
})
export class CurrencyRateComponent implements OnInit, OnDestroy {
  rates: Rate[] = [];
  subscription: Subscription;

  constructor(private rateService: RateService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = new Subscription();

    this.subscription.add(this.rateService.getRate()
      .subscribe((rates: Rate[]) => {
        this.rates = rates;
      }));
  }

  async navigateToDetails(rate: Rate): Promise<void> {
    await this.router.navigate(['/', 'rate', 'currency', rate.currencyName]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
