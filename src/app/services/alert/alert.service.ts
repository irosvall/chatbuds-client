import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from 'src/app/models/alert';

@Injectable({
  providedIn: 'root'
})

/**
 * Handles alerts so other component can listen to alerts or send them.
 */
export class AlertService {
  private alertSubject: Subject<Alert> = new Subject<Alert>()

  constructor() { }

  addAlert(alert: Alert): void {
    this.alertSubject.next(alert)
  }

  onAlert(): Observable<Alert> {
    return this.alertSubject.asObservable()
  }
}
