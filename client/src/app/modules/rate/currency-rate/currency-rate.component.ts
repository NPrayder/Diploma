import { Component, OnDestroy, OnInit } from '@angular/core';
import { RateService } from '../../../shared/core/services/rate.service';
import { Rate } from '../../../shared/models/rate.interface';
import { of, Subscription } from 'rxjs';
import * as currencyCodes from 'currency-codes';
import { concatMap, distinct, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.scss']
})
export class CurrencyRateComponent implements OnInit, OnDestroy {
  rates: Rate[] = [];
  subscription: Subscription;

  constructor(private rateService: RateService) {
  }

  ngOnInit(): void {
    this.subscription = new Subscription();

    this.subscription.add(this.rateService.getRate()
      .subscribe((rates: Rate[]) => {
        this.rates = rates;
      }));
  }

  getCurrencyName(code: number): string {
    return currencyCodes.number(`${code}`).currency;
  }

  getCurrencySymbol(code: number): string {
    const id = currencyCodes.number(`${code}`).code;
    const intl = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: id});
    return intl.format(0).replace(/\d+|\.|,/g, '');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
