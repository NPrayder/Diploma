import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { AuthResponse } from '../core/models/auth-response';
import { UserService } from '../../../shared/core/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpFormGroup: FormGroup;

  constructor(private authService: AuthService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.signUpFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  get name(): FormControl {
    return this.signUpFormGroup.get('name') as FormControl;
  }

  get email(): FormControl {
    return this.signUpFormGroup.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.signUpFormGroup.get('password') as FormControl;
  }

  async signUp(): Promise<void> {
    if (this.signUpFormGroup.valid) {
      const {name, email, password} = this.signUpFormGroup.value;

      this.authService.signUp(name, email, password)
        .subscribe(async (response: AuthResponse) => {
          const {token, ...user} = response;
          this.userService.setToken(token);
          this.userService.setUser(user);

          await this.router.navigate(['wizard']);
        });
    }
  }
}
