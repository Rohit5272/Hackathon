import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgetComponent } from '../login/forget/forget.component';

@Injectable({
  providedIn: 'root'
})
export class ForgetService {

  constructor(private dialog:MatDialog) { }

  openforget(){
    return this.dialog.open(ForgetComponent,{
      width:'600px',
      height:'300px',
      position: { top: '7%' },
      data:{
        
      }
    })
  }
}
