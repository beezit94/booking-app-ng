import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}
  formData: any = {};
  errors: any[] = [];

  register() {
    this.authService.registerUser(this.formData).subscribe(
      () => {
        this.route.navigate(['/login', { registered: 'success' }]);
      },
      errorResponse => {
        this.errors = errorResponse.error.errors;
      }
    );
  }
  ngOnInit() {}
}
