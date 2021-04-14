import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ErrorHandlerService } from './../error-handler/error-handler.service'

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {
  httpOptions = {
    withCredentials: true,
  }

  httpOptionsWithHeaders = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor (
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  /**
   * Gets the welcome object from the API gateway
   */
  getWelcomeText(): Observable<{message?: String}> {
    return this.http.get<object>(env.API_GATEWAY_URL, this.httpOptions)
      .pipe(
        catchError(this.errorHandlerService.handleError<object>('getWelcomeText', { message: '' }))
      )
  }
}
