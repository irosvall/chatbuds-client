import { Component } from '@angular/core'
import { Router } from '@angular/router'
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
    private router: Router,
  ) {
    this.friends = this.userService.friends
   }

   onSelectFriend(id: string) {
    this.router.navigate(['chat', id])
   }
}
