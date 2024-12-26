import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-userguide',
  templateUrl: './userguide.component.html',
  styleUrls: ['./userguide.component.scss']
})



export class UserguideComponent implements OnInit {
  pdfSrc!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    const url = 'http://localhost:3000/media/userguide/userguide.pdf';
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


}
