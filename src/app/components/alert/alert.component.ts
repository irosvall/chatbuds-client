import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Alert, FriendRequestAlert } from 'src/app/models/alert'
import { AlertService } from 'src/app/services/alert/alert.service'
import { SocketioService } from 'src/app/services/socketio/socketio.service'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  private alertSubscription: Subscription;
  public alerts: Alert[] = []

  constructor (
    private alertService: AlertService,
    private socketService: SocketioService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    // Subscribe to alert notifications.
    this.alertSubscription = this.alertService.onAlert()
      .subscribe(alert => this.alerts.push(alert))

    // Listen to friend requests.
    this.socketService.socket.on('newFriend', res => this.alertService.successAlert(`You are now friends with ${res.user.username}`))
    this.socketService.socket.on('friendRequest', res => this.alertService.friendRequestAlert(res.from, `${res.from.username} send a friend request`))
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe()
  }

  /**
   * Accepts the friend request.
   */
  onAcceptFriendRequest(friendRequest: FriendRequestAlert) {
    this.userService.acceptFriendRequest(friendRequest.from.userID).subscribe(res => {
      if (!res.ok) {
        this.alertService.warningAlert('An error occured, try again')
      } else {
        this.removeAlert(friendRequest)
      }
    })
  }

  /**
   * Declines the friend request.
   */
  onDeclineFriendRequest(friendRequest: FriendRequestAlert) {
    this.userService.declineFriendRequest(friendRequest.from.userID).subscribe(res => {
      if (!res.ok) {
        this.alertService.warningAlert('An error occured, try again')
      } else {
        this.removeAlert(friendRequest)
      }
    })
  }

  /**
   * Removes the alert from the list of alerts.
   */
  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert)
  }
}
