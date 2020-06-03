import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RateService } from '../../../shared/core/services/rate.service';
import { Rate } from '../../../shared/models/rate.interface';
import { Subscription } from 'rxjs';
import * as currencyCodes from 'currency-codes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-currency-rate',
  templateUrl: './currency-rate.component.html',
  styleUrls: ['./currency-rate.component.scss']
})
export class CurrencyRateComponent implements OnInit, OnDestroy {
  @Input() hideHeader: boolean;
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

  getCurrencyName(code: number): string {
    return currencyCodes.number(`${code}`).currency;
  }

  getCurrencySymbol(code: number): string {
    const id = currencyCodes.number(`${code}`).code;
    const intl = new Intl.NumberFormat('ru-RU', {style: 'currency', currency: id});
    return intl.format(0).replace(/\d+|\.|,/g, '');
  }

  async navigateToDetails(rate: Rate): Promise<void> {
    const code = currencyCodes.number(rate.currencyCodeA.toString()).code;
    await this.router.navigate(['/', 'rate', code.toLowerCase()]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
