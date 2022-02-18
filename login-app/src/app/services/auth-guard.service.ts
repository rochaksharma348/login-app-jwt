import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');

    if (username != null && token != null) {
      req = req.clone({
        setHeaders : {
          Authorization : token
        }
      });
    }

    return next.handle(req);
  }
}
