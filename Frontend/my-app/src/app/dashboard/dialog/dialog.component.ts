import { Component,OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef:MatDialogRef<DialogComponent>) {}

  ngOnInit() {

  }

  closeDialog() {
    this.dialogRef.close(false)
  }

}
