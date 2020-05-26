import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponse } from '../core/models/auth-response';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/core/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInFormGroup: FormGroup;

  constructor(private authService: AuthService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.signInFormGroup = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  get email(): FormControl {
    return this.signInFormGroup.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.signInFormGroup.get('password') as FormControl;
  }

  async signIn(): Promise<void> {
    if (this.signInFormGroup.valid) {
      const {email, password} = this.signInFormGroup.value;

      this.authService.signIn(email, password)
        .subscribe(async (response: AuthResponse) => {
          const {token, ...user} = response;
          this.userService.setToken(token);
          this.userService.setUser(user);

          await this.router.navigate(['wizard']);
        });
    }
  }
}
