import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const baseURL = "http://localhost:3000/product"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _auth: AuthService,private _http: HttpClient) { }

  getProducts() {
    return this._http.get(`${baseURL}/find`,this.httOptions())
  }

  createProducts(data:any) {
    return this._http.post(`${baseURL}/create`,data,this.httOptions())
  }
  // Update Product
  updateProduct(data:any) {
    return this._http.put(`${baseURL}/update/${data.id}`,data,this.httOptions())
  }

  deleteProducts(id:any) {
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
