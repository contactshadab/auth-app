import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class OrderService {

  constructor(private http: AuthHttp) { }

  getOrders(){
    //As we are using angular2-jwt, the commented lines of code are handled internally
    /* let token = localStorage.getItem('token');
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/orders', options) */
    
    return this.http.get('/api/orders')
      .map(response => response.json());
  }

}
