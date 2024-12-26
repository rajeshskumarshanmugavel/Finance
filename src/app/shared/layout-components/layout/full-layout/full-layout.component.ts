import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})
export class FullLayoutComponent implements OnInit {

  constructor(){
   }

  ngOnInit(): void {
    document.querySelector('body')?.classList.remove('horizontal');
    document.body.className = "ltr error-page1 bg-primary"
  }

  ngOnDestroy() {
    document.body.className = "ltr main-body app sidebar-mini"
   }

}
