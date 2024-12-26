import { Component, OnInit } from '@angular/core';

interface Alert {
  id?: number;
  type: string;
  message: string;
  title: string;
  icon?: string;
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  //
  public isCollapsed1 = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  public isCollapsed4 = true;
  public isCollapsed5 = true;
  public isCollapsed6 = true;
  public isCollapsed7 = true;
  public isCollapsed8 = true;
  constructor() { }

  ngOnInit(): void {
  }

  alerts:Alert[] = [
    {id: 1, type: 'success', message: 'You successfully read this alert message.', title: 'Well done!'},
    {id: 2, type: 'info', message: "This alert needs your attention, but it's not super.", title: 'Heads up!'},
    {id: 3, type: 'warning', message: "Better check yourself, you're not looking too good.", title: 'Warning!'},
    {id: 4, type: 'danger', message: 'Change a few things up and try submitting again.', title: 'Oh snap!'},
  ]

  alertsOutline:Alert[] = [
    {id: 1, type: 'outline-success', message: 'You successfully read this alert message.', title: 'Well done!'},
    {id: 2, type: 'outline-info', message: "This alert needs your attention, but it's not super.", title: 'Heads up!'},
    {id: 3, type: 'outline-warning', message: "Better check yourself, you're not looking too good.", title: 'Warning!'},
    {id: 4, type: 'outline-danger', message: 'Change a few things up and try submitting again.', title: 'Oh snap!'},
  ]
  alertsSolid:Alert[] = [
    {id: 1, type: 'solid-success', message: 'You successfully read this alert message.', title: 'Well done!'},
    {id: 2, type: 'solid-info', message: "This alert needs your attention, but it's not super.", title: 'Heads up!'},
    {id: 3, type: 'solid-warning', message: "Better check yourself, you're not looking too good.", title: 'Warning!'},
    {id: 4, type: 'solid-danger', message: 'Change a few things up and try submitting again.', title: 'Oh snap!'},
  ]
  alertsDismissing:Alert[] = [
    {id: 1, type: 'warning', message: 'You should check in on some of those fields below.', title: 'Holy guacamole!'},
    {id: 2, type: 'success', message: "You should check in on some of those fields below.", title: 'Holy guacamole!'},
    {id: 3, type: 'danger', message: 'You should check in on some of those fields below.', title: 'Holy guacamole!'},
    {id: 4, type: 'info', message: "You should check in on some of those fields below.", title: 'Holy guacamole!'},
  ]
  alertsIcons:Alert[] = [
    {id: 1, type: 'default', message: 'This is a Default alert—check it out that has an icon too!', title: 'Default!', icon: 'download'},
    {id: 2, type: 'success', message: "This is a Primary alert—check it out that has an icon too!", title: 'Primary!', icon: 'check-square'},
    {id: 3, type: 'danger', message: 'This is a Success alert—check it out that has an icon too!', title: 'Success!', icon: 'thumbs-up'},
    {id: 4, type: 'warning', message: "This is a warning alert—check it out that has an icon too!", title: 'Warning!', icon: 'info'},
    {id: 5, type: 'info', message: "This is a info alert—check it out that has an icon too!", title: 'Info!', icon: 'bell'},
    {id: 6, type: 'danger', message: "This is a Danger alert—check it out that has an icon too!", title: 'Danger!', icon: 'slash'},
  ]

  closeOutline(alertoutline: Alert) {
    this.alertsOutline.splice(this.alertsOutline.indexOf(alertoutline), 1);
  }
  closeSolid(alert: Alert) {
    this.alertsSolid.splice(this.alertsSolid.indexOf(alert), 1);
  }
  closeDismissing(alert: Alert) {
    this.alertsDismissing.splice(this.alertsDismissing.indexOf(alert), 1);
  }
  closeIcons(alert: Alert) {
    this.alertsIcons.splice(this.alertsIcons.indexOf(alert), 1);
  }
}
