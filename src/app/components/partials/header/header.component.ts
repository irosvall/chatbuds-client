import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean

  constructor (
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.onIsLoggedIn().subscribe(status => this.isLoggedIn = status)
  }
}
