import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable()
export class DataInterceptor implements HttpInterceptor {

  constructor(private tostr: HotToastService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('sellerToken')}`
      }
    });

    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {

      switch (error.error.code) {

        case 400: this.tostr.error(error.error.message);
          break;

        case 409: this.tostr.error(error.error.message);
          break;

        case 404: this.tostr.error(error.error.message);
          break;
      }

      return throwError(error);
    }));
  }
}