import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  /**
   * Handle Http operations that failed.
   * 
   * @param operation - Name of the operation that failed.
   * @param result - Optional value to return as the observable result, if left out the error is sent.
   */
   public handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      // Client errors such as network errors.
      if (error instanceof ErrorEvent) {
        console.error('An error occurred:', error.message);
      }

      // Let the app keep running by returning an empty result.
      if (result === undefined) {
        return of(error as T)
      } else {
        return of(result as T)
      }
    }
  }
}
