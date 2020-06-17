import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WizardService } from '../core/services/wizard.service';
import { SnackbarService } from '../../../shared/core/services/snackbar.service';
import { finalize } from 'rxjs/operators';
import { SimpleResponse } from '../../../shared/core/models/simple-response-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mono-step',
  templateUrl: './mono-step.component.html',
  styleUrls: ['./mono-step.component.scss']
})
export class MonoStepComponent implements OnInit, OnDestroy {
  monoToken: string;
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
      this.wizardService.addWizardToken(this.monoToken)
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
