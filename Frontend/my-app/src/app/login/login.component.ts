import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userForm: FormGroup;
  hide = true;
  errorMessage: string | null = null;

  constructor(private fb:FormBuilder,private _auth:AuthService, private _router:Router) {
    this.userForm = this.fb.group({
      email:['', [Validators.required, Validators.email]], 
      password:['', Validators.required] 
    })
  }

  submit(user: any) {
    this.errorMessage = null; // Clear any previous error message
    this._auth.login(user).subscribe({
      next: (data) => {
        this._router.navigate(['/dashboard']);
        localStorage.setItem('user', JSON.stringify(data));
      },
      error: (error) => {
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
        }
      }
    });
  }
}
