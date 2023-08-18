import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  post(normalUrl: any, payload: any) {

    return this.http.post(`${this.baseUrl}${normalUrl}`, payload);
  }

  get(normalUrl: any) {

    return this.http.get(`${this.baseUrl}${normalUrl}`);
  }

  patch(normalUrl: any, payload: any) {

    return this.http.patch(`${this.baseUrl}${normalUrl}`, payload);

  }

  delete(normalUrl: any) {

    return this.http.delete(`${this.baseUrl}${normalUrl}`);
  }

}