import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/core/services/user.service';

@Component({
  selector: 'app-account-root',
  templateUrl: './account-root.component.html',
  styleUrls: ['./account-root.component.scss']
})
export class AccountRootComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}
