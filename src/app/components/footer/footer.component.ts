import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggedIn: Boolean = false

  constructor (
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.onIsLoggedIn().subscribe(status => this.isLoggedIn = status)
  }
}
