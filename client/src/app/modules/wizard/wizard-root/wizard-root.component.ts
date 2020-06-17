import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../shared/core/services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/core/models/user-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wizard-root',
  templateUrl: './wizard-root.component.html',
  styleUrls: ['./wizard-root.component.scss']
})
export class WizardRootComponent implements OnInit, OnDestroy {
  @Input() addNewCard: boolean;
  subscription: Subscription;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = new Subscription();

    // this.subscription.add(this.userService.getUser()
    //   .subscribe(async (user: User) => {
    //     if (user.cardAdded && !this.addNewCard) {
    //       await this.router.navigate(['/']);
    //     }
    //   }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
