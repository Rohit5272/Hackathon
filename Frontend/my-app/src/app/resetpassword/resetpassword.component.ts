import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit{
  
  resetForm:FormGroup

  constructor(private fb:FormBuilder,private _auth:AuthService,
    private route: ActivatedRoute) {
    this.resetForm = this.fb.group({
      password:[''],
      confirm_password:['']
    })
  }
  
  ngOnInit() {
  }

  submit(data:any) {
    const token = this.route.snapshot.paramMap.get('token');
    console.log(token); 
    console.log(data,token);
    this._auth.resetPassword(data,token).subscribe({
      next:(data) => {
        console.log(data);
      },
      error:(e) => console.log(e)
    })
  }

}
