import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = "http://localhost:3000/category"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _auth: AuthService,private _http: HttpClient) { }

  // Get Category
  getCategory(): Observable<any> {
    return this._http.get(`${baseURL}/find`,this.httOptions())
  }

  // Create Category
  createCategory(data:any): Observable<any> {
    return this._http.post(`${baseURL}/create`,data,this.httOptions())
  }
  // Update Category
  updateCategory(data:any): Observable<any> {
    return this._http.put(`${baseURL}/update/${data.id}`,data,this.httOptions())
  }
  
  // Delete Category
  deleteProducts(id:any): Observable<any> {
    return this._http.delete(`${baseURL}/delete/${id}`,this.httOptions())
  }

  // Authorization token
  private httOptions() {
    let token;
    if(this._auth.isAuthenticated()) {
      const user = JSON.parse(this._auth.isAuthenticated())
      token = user.token ? user.token : '';
    }
    return {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': token
      })
    }
  }
}
