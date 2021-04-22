import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

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
    this.userService.isLoggedIn$.subscribe(status => this.isLoggedIn = status)
  }
}
