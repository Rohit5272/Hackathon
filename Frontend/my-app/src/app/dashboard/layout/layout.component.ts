import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  
})
export class LayoutComponent {

  show:boolean = false

  constructor(private _user:AuthService,private _dialog:DialogService) {}

  change() {
    this.show = !this.show
  }
  logout() {
    this._dialog.openConfirmDialog("Are you sure you want to log out ?","Log Out")
    .afterClosed().subscribe(res => {
      console.log(res);
      if(res){
        this._user.logout();
      }
    })
  }

}
