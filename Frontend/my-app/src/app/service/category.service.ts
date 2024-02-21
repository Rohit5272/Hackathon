import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const baseURL = "http://localhost:3000/category"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _auth: AuthService,private _http: HttpClient) { }

  getCategory() {
    let token;
    if(this._auth.isAuthenticated()) {
      const user = JSON.parse(this._auth.isAuthenticated())
      token = user.token ? user.token : '';
    }
    const httOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': token
      })
    }
    return this._http.get(`${baseURL}/find`,httOptions)
  }
  
  deleteProducts(id:any) {
    console.log(id);
    let token;
    if(this._auth.isAuthenticated()) {
      const user = JSON.parse(this._auth.isAuthenticated())
      token = user.token ? user.token : '';
    }
    const httOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': token
      })
    }
    return this._http.delete(`${baseURL}/delete/${id}`,httOptions)
  }
}
