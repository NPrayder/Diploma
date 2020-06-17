import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/core/services/user.service';
import { BankTypes } from '../../core/models/bank-types.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-preview',
  templateUrl: './card-preview.component.html',
  styleUrls: ['./card-preview.component.scss']
})
export class CardPreviewComponent implements OnInit, OnDestroy {
  userName: string;

  @Input() cardNum: string;
  @Input() bank: BankTypes;

  subscription: Subscription;

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.subscription.add(this.userService.getUser()
      .subscribe(({name}) => this.userName = name));
  }

  getBankLogo(): string {
    return this.bank === BankTypes.MONOBANK ? 'favicon-mono.ico' : 'favicon-pb.png';
  }

  getBankSystem(): string {
    return this.cardNum.toString()[0] === '5' ? 'mastercard-logo.svg' : 'visa-logo.png';
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
