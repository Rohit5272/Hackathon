import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userForm: FormGroup;

  constructor(private fb:FormBuilder,private _authService:AuthService) {
    this.userForm = this.fb.group({
      email:'',
      name:'',
      password:''
    })
  }

  submit(user:any) {
    console.log(user);
    this._authService.register(user).subscribe((data) => {
      console.log(data);
    })
  }
}
