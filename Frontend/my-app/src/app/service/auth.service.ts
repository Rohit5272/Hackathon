import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

const baseURL = "http://localhost:3000/user"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _router:Router,public _http:HttpClient,
  private route: ActivatedRoute) { }

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

  sendEmail(data:string): Observable<any>  {
    console.log(data);
    return this._http.post<any>(`${baseURL}/sendemail`,data)
  }

  resetPassword(data:any,token:string): Observable<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': token
      })
    }
    return this._http.post<any>(`${baseURL}/reset`,data,httpOptions);
  }
}
