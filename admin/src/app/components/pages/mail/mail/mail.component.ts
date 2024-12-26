import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss']
})
export class MailComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content:any) {
    const options: NgbModalOptions = {
      windowClass: 'custom-modal-class' // Add your custom CSS class here
    };
    this.modalService.open(content, {backdrop : 'static' , windowClass : 'modalCusSty' })
  }
}
