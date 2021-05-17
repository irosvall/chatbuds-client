import { Component } from '@angular/core'
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent {
  friends: User[] = []

  constructor(
    private userService: UserService,
  ) {
    this.friends = this.userService.friends
   }
}
