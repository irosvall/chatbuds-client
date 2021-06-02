import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { Alert, AlertType, FriendRequestAlert } from 'src/app/models/alert'
import { User } from 'src/app/models/user'
import { AlertService } from 'src/app/services/alert/alert.service'
import { SocketioService } from 'src/app/services/socketio/socketio.service'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  public alerts: Alert[] = []

  private alertSubscription: Subscription
  private newFriendSubscription: Subscription
  private friendRequestSubscription: Subscription

  constructor (
    private alertService: AlertService,
    private socketService: SocketioService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    // Subscribe to alert notifications.
    this.alertSubscription = this.alertService.onAlert()
      .subscribe((alert: Alert) => this.onAlert(alert))

    // Listen to friend requests.
    this.newFriendSubscription = this.socketService.onNewFriend()
      .subscribe((user: User) => this.onNewFriend(user))

    this.friendRequestSubscription = this.socketService.onFriendRequest()
      .subscribe((user: User) => this.alertService.friendRequestAlert(user, `${user.username} sent a friend request:`))
  }

  ngOnDestroy() {
    this.alertSubscription?.unsubscribe()
    this.newFriendSubscription?.unsubscribe()
    this.friendRequestSubscription?.unsubscribe()
  }

  /**
   * Adds alert to display if the previous alert message wasn't exactly the same.
   */
  onAlert(alert: Alert) {
    if (alert.message !== this.alerts[this.alerts.length - 1]?.message) {
      this.alerts.push(alert)

      // Make the alert dissapear after 3 seconds if it isn't a friend request.
      if (alert.type !== AlertType.FriendRequest) {
        setTimeout(() => this.removeAlert(alert), 3000)
      }
    }
  }

  /**
   * Alert user if it has a new friend and update it's user information.
   */
  onNewFriend(user: User) {
    this.alertService.successAlert(`You are now friends with ${user.username}`)
    this.userService.updateUser().subscribe()
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
