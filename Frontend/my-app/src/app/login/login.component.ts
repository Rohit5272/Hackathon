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

  constructor(private fb:FormBuilder,private _auth:AuthService, private _router:Router) {
    this.userForm = this.fb.group({
      email:['', [Validators.required, Validators.email]], 
      password:['', Validators.required] 
    })
  }

  submit(user:any) {
    // console.log(user);
    this._auth.login(user).subscribe((data) => {
      // console.log(data);
      this._router.navigate(['/dashboard']);
      localStorage.setItem('user', JSON.stringify(data))
    })
  }
}
