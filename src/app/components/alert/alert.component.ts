import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Alert } from 'src/app/models/alert';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  private alertSubscription: Subscription;
  public alerts: Alert[] = []

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    // Subscribe to alert notifications.
    this.alertSubscription = this.alertService.onAlert()
      .subscribe(alert => this.alerts.push(alert))
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe()
  } 

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert)
  }
}
