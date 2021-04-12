import { Component, OnInit } from '@angular/core';

import { ApiGatewayService } from '../../services/api-gateway.service'

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  message: String = '';

  constructor(private apiGatewayService: ApiGatewayService) { }

  ngOnInit(): void {
    this.apiGatewayService.getWelcomeText()
      .subscribe(object => this.message = object.message); 
  }
}
