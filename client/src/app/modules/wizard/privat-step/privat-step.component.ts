import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WizardService } from '../core/services/wizard.service';
import { SnackbarService } from '../../../shared/core/services/snackbar.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { SimpleResponse } from '../../../shared/core/models/simple-response-interface';

@Component({
  selector: 'app-privat-step',
  templateUrl: './privat-step.component.html',
  styleUrls: ['./privat-step.component.scss']
})
export class PrivatStepComponent implements OnInit, OnDestroy {
  password: string;
  userId: string;
  cardNum: string;
  disableButton: boolean;
  subscription: Subscription;

  constructor(private wizardService: WizardService,
              private snackbarService: SnackbarService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = new Subscription();
  }

  addToken(): void {
    this.disableButton = true;
    this.subscription.add(
      this.wizardService.addPrivatToken(this.userId, this.cardNum, this.password)
        .pipe(
          finalize(() => this.disableButton = false)
        )
        .subscribe(async (response: SimpleResponse) => {
          this.snackbarService.showSnackbar(response.msg);
          await this.router.navigate(['wizard', 'successful-adding']);
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
