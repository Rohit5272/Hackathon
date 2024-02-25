import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = "http://localhost:3000/product"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _auth: AuthService,private _http: HttpClient) { }

  getProducts(): Observable<any>  {
    return this._http.get(`${baseURL}/find`,this.httOptions())
  }

  createProducts(data:any): Observable<any>  {
    let formData: any = new FormData();
    formData.append('name',data.name);
    formData.append('image',data.image);
    formData.append('packSize',data.packSize);
    formData.append('MRP',data.MRP);
    formData.append('status',data.status);
    formData.append('category',data.category);
    console.log(formData);
    return this._http.post<any>(`${baseURL}/create`,formData)
  }
  // Update Product
  updateProduct(data:any): Observable<any>  {
    let formData: FormData = new FormData();
  formData.append('name', data.name);
  formData.append('packSize', data.packSize);
  formData.append('MRP', data.MRP);
  formData.append('status', data.status);
  formData.append('category', data.category);
  
  // Check if image is provided
  if (data.image instanceof File) {
    formData.append('image', data.image);
  }

  return this._http.put<any>(`${baseURL}/update/${data.id}`, formData)
  }

  deleteProducts(id:any): Observable<any>  {
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
