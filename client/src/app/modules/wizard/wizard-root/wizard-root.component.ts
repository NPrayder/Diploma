import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../shared/core/services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/core/models/user-interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-wizard-root',
  templateUrl: './wizard-root.component.html',
  styleUrls: ['./wizard-root.component.scss']
})
export class WizardRootComponent implements OnInit, OnDestroy {
  addNewCard: boolean;
  subscription: Subscription;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = new Subscription();
    this.addNewCard = history.state.data?.addNew;

    this.subscription.add(this.userService.getUser()
      .subscribe(async (user: User) => {
        if (user.cardAdded && !this.addNewCard) {
          await this.router.navigate(['/']);
        }
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
