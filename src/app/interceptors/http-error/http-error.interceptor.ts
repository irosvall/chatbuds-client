import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { Router } from '@angular/router'
import { catchError } from 'rxjs/operators'

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  /**
   * Every request that sends the status code 500 redirects to an internal server error page.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 500) {
            this.router.navigate(['500'], { skipLocationChange: true })
          }
          throw new Error(error.message)
        })
      )
  }
}
