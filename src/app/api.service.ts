import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

    getUser(username:string):Observable<Object> {
      return this.http.get('http://localhost:51755/api/logins/'+username);
    
  }
  getAllMenu():Observable<Object> {
    return this.http.get('http://localhost:51755/api/menus');
  }

  getMenuByID(id:number):Observable<Object> {
    return this.http.get('http://localhost:51755/api/menus/'+id);
  }

  postCustomer(data:any):Observable<Object> {
    return this.http.post('http://localhost:51755/api/customers',data);
  }

  postOrder(data:any):Observable<Object> {
    return this.http.post('http://localhost:51755/api/orders',data);
  }
  getOrders():Observable<Object> {
    return this.http.get('http://localhost:51755/api/orders/');
  }
}
