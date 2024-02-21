import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const baseURL = "http://localhost:3000/user"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router:Router,public _http:HttpClient) { }

  register(user:any){
    return this._http.post(`${baseURL}/register`,user)
  }

  login(user:any) {
    return this._http.post(`${baseURL}/login`,user)
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  isAuthenticated() {
    return localStorage.getItem('user');
  }

}
