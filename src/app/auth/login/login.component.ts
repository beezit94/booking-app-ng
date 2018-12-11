import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../shared/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = '';
  ngOnInit() {
    this.initForm();
    this.route.params.subscribe(params => {
      if (params['registered'] === 'success') {
        this.notifyMessage =
          'You have successfully registered, please login now.';
      }
    });
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
          )
        ]
      ],
      password: ['', Validators.required]
    });
  }

  isInvalidForm(fieldName): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }

  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

  login() {
    this.authService.loginUser(this.loginForm.value).subscribe(
      data => {
        // console.log(data);
        this.router.navigate(['/rentals']);
      },
      errorResponse => {
        this.errors = errorResponse.error.errors;
      }
    );
  }

  // private saveToken(token: string) {
  //   window.localStorage.setItem('token', token);
  //   return token;
  // }
}
