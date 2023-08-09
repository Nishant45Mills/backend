import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  post(normalUrl: any, payload: any) {

    const c = localStorage.getItem('sellerToken');
    const headers = { 'Authorization': `Bearer ${c}` }

    return this.http.post(`${this.baseUrl}${normalUrl}`, payload, { headers });
  }

  get(normalUrl: any) {

    const c = localStorage.getItem('sellerToken');
    const headers = { 'Authorization': `Bearer ${c}` }

    return this.http.get(`${this.baseUrl}${normalUrl}`, { headers });
  }

}