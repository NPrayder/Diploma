import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user-interface';
import { UserService } from '../../core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User;
  subscription: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.subscription = new Subscription();

    this.initSubscriptions();
  }

  initSubscriptions(): void {
    this.subscription.add(this.userService.getUser()
      .subscribe((user: User) => {
        this.user = user;
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
