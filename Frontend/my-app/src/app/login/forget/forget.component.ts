import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit{

  emailForm:FormGroup
  msg:string
  
  constructor(private fb:FormBuilder,private _auth:AuthService,
    public dialogRef:MatDialogRef<ForgetComponent>) {
    this.emailForm = this.fb.group({
      email:['']
    })
  }
  
  ngOnInit(): void {
  }

  submit(data:any) {
    console.log(data);
    this._auth.sendEmail(data).subscribe({
      next:(data) => {
        console.log(data);
        this.msg = data.message
        setTimeout(() => {
          this.dialogRef.close(false)
        }, 3000);
      },
      error:(e) => console.log(e)
    })
  }

  closeDialog() {
    this.dialogRef.close(false)
  }

}
