import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { Alert, AlertType, FriendRequestAlert } from 'src/app/models/alert'
import { User } from 'src/app/models/user'

@Injectable({
  providedIn: 'root'
})

/**
 * Handles alerts so other component can listen to alerts or send them.
 */
export class AlertService {
  private alertSubject: Subject<Alert> = new Subject<Alert>()

  constructor() { }

  /**
   * Let's other subscribe to new alerts.
   */
  onAlert(): Observable<Alert> {
    return this.alertSubject.asObservable()
  }

  successAlert(message: string) {
    this.addAlert({
      message: message,
      type: AlertType.Success
    })
  }

  warningAlert(message: string) {
    this.addAlert({
      message: message,
      type: AlertType.Warning
    })
  }

  infoAlert(message: string) {
    this.addAlert({
      message: message,
      type: AlertType.Info
    })
  }

  friendRequestAlert(user: User, message: string) {
    this.addAlert(new FriendRequestAlert(message, user))
  }

  addAlert(alert: Alert): void {
    this.alertSubject.next(alert)
  }
}
