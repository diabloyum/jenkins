import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { CommonConstance } from '../constance/common.constance';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if no token, redirect to login page
    if (localStorage.getItem(CommonConstance.LOCALSTORAGE.OAUTH_TOKEN)) {
      // append token to request
      const token = JSON.parse(localStorage.getItem(CommonConstance.LOCALSTORAGE.OAUTH_TOKEN));
      const JWT = `Bearer ${token}`;
      req = req.clone({
        setHeaders: {
          Authorization: JWT,
          responseType: 'json'
        }
      });
    }

    // show loading spinner
    return next.handle(req).do(
      (event: HttpEvent<any>) =>
        event,
      (err: any) => {
        setTimeout(_ => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            localStorage.removeItem(CommonConstance.LOCALSTORAGE.OAUTH_TOKEN);
            this.router.navigate(['/portal/login']);
          }
          // when error, hide spinner
        });
      }
    );
  }
}
