import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/core/services/user.service';

@Component({
  selector: 'app-account-root',
  templateUrl: './account-root.component.html',
  styleUrls: ['./account-root.component.scss']
})
export class AccountRootComponent implements OnInit {
  showPreloader = true;

  constructor(public userService: UserService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  hidePreloader() {
    this.showPreloader = false;
    this.cdr.detectChanges();
  }
}
