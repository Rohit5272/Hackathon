import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dashboard/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg:string,head:string){
    return this.dialog.open(DialogComponent,{
      width:'400px',
      height:'230px',
      // position: {top :"40px"},
      data:{
        heading:head,
        message:msg
      }
    })
  }
}
