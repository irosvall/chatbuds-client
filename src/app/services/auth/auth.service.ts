import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment as env } from '../../../environments/environment'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { ErrorHandlerService } from './../error-handler/error-handler.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Handles authorization requests towards the API Gateway.
 */
export class AuthService {
  httpOptions: Object = {
    withCredentials: true,
  }

  httpOptionsWithHeaders: Object = {
    withCredentials: true,
    observe: 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  constructor (
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  /**
   * Registers an user.
   */
  /*
    async getWelcomeText(data: object): Promise<boolean> {
    try {
      let res = await fetch(`${env.API_GATEWAY_URL}/api/v1/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (res.status !== 201) {
        return false
      }
    } catch {
      this.errorHandlerService.handleError<object>('getWelcomeText', { message: '' })
    }
  }
  */
  /**
   * Registers an user.
   *
   * @param {object} data - The object to be inserted in the body of the request
   * @param {string} data.email - User's email.
   * @param {string} data.username - User's username.
   * @param {string} data.password - User's password.
   * @returns {Observable<any>}
   */
  register(data: object): Observable<any> {
    return this.http.post<object>(`${env.API_GATEWAY_URL}auth/api/v1/register`, JSON.stringify(data), this.httpOptionsWithHeaders)
      .pipe(
        catchError(this.errorHandlerService.handleError<object>('register'))
      )
  }
}
