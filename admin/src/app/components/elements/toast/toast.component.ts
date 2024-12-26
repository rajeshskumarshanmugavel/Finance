import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  show = true;
  show1 = true;
  show2 = true;
  show3 = true;
  show4 = true;
  show5 = true;
  show6 = true;
  show7 = true;
  show8 = true;
  constructor() { }

  ngOnInit(): void {
  }

  public isCollapsed1 = true;
  public isCollapsed2 = true;
  public isCollapsed3 = true;
  public isCollapsed4 = true;
}
