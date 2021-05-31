import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { User } from 'src/app/models/user'
import { SocketioService } from 'src/app/services/socketio/socketio.service'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit, OnDestroy {
  public friends: User[] = []

  private newFriendSubscription: Subscription
  private removeFriendSubscription: Subscription

  constructor (
    private userService: UserService,
    private router: Router,
    private socketService: SocketioService,
  ) {
    this.friends = this.userService.friends.sort()
  }

  ngOnInit(): void {
    this.newFriendSubscription = this.socketService.onNewFriend()
      .subscribe((user: User) => this.onNewFriend(user))

    this.removeFriendSubscription = this.socketService.onRemoveFriend()
      .subscribe((user: User) => this.onRemoveFriend(user))
  }

  ngOnDestroy(): void {
    this.newFriendSubscription?.unsubscribe()
    this.removeFriendSubscription?.unsubscribe()
  }

  /**
   * Navigate to private chat with the friend who is clicked on.
   */
  onSelectFriend(id: string) {
    this.router.navigate(['chat', id])
  }

  /**
   * Push new friends into the friend list and sort it.
   */
  private onNewFriend(user: User): void {
    this.friends.push(user)
    this.friends.sort()
  }

  /**
   * Removes user from friend list.
   */
  private onRemoveFriend(user: User): void {
    const index = this.friends.findIndex((friend: User) => friend.userID === user.userID)

    if (index !== -1) {
      this.friends.splice(index, 1)
    }
  }
}
