import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../environments/environment'

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
  ) { }

  /**
   * Gets the welcome object from the API gateway
   */
  getWelcomeText(): Observable<{message?: String}> {
    return this.http.get<object>(env.API_GATEWAY_URL, this.httpOptions)
      .pipe(
        catchError(this.handleError<object>('getWelcomeText', { message: '' }))
      )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
