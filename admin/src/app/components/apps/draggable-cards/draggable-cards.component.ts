import { Component, OnInit } from '@angular/core';
// import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-draggable-cards',
  templateUrl: './draggable-cards.component.html',
  styleUrls: ['./draggable-cards.component.scss'],
})
export class DraggableCardsComponent implements OnInit {
  todo = [
      `<div class="card custom-card card-body card-draggable">
      <p class="card-text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum...</p>
      </div>`,
      `<div class="card custom-card card-img-top-1 card-draggable">
      <img alt="Image" class="img-fluid card-img-top" src="./assets/img/photos/1.jpg">
      <div class="card-body">
        <p class="card-text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.</p>
      </div>
      </div>`,
    `<div class="card custom-card card-draggable">
      <div class="card-body">
      <p class="mg-b-0">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum...</p>
    </div>
    <div class="card-footer">
      January, 20, 2017 4:30am
    </div>
    </div>`,
    `<div class="card custom-card  bg-primary tx-white card-draggable">
    <div class="card-body">
      <h5 class="card-title tx-white tx-medium mg-b-10">The Card Title</h5>
      <p class="card-subtitle mg-b-15 tx-white-8">This is the card subtitle</p>
      <p class="card-text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum.</p><a class="card-link tx-white-7 hover-white" >Card link</a>
      <a class="card-link tx-white-7 hover-white" >Another link</a>
    </div>
    </div>`
  ]
  done = [
      `<div class="card custom-card card-body card-draggable bg-secondary tx-white">
      <p class="card-text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum...</p>
    </div>`,
      `<div class="card custom-card card-draggable">
      <div class="card-body">
        <h5 class="card-title tx-dark tx-medium mg-b-10">The Card Title</h5>
        <p class="card-subtitle mg-b-15">This is the card subtitle</p>
        <p class="card-text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.</p><a class="card-link" >Card link</a> <a class="card-link"
          >Another link</a>
      </div>
    </div>`,
    `<div class="card custom-card bg-dark card-body tx-white-8 bg-gray-800 card-draggable">
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    Lorem ipsum dolor sit amet consictetur.
    </div>`,
    `<div class="card custom-card card-draggable">
    <div class="card-body">
      <p class="card-text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum.</p>
    </div>
    <img alt="Image" class="img-fluid card-img-bottom bd-ts-0 bd-te-0" src="./assets/img/photos/3.jpg">
  </div>`
  ]
  done1 = [
      `<div class="card custom-card card-body card-draggable bg-primary tx-white">
      <p class="card-text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum. Lorem ipsum dolor sit amet consictetur...</p>
    </div>`,
      `<div class="card custom-card card-draggable overflow-hidden">
      <img alt="Image" class="card-img img-fluid card-img-top " src="./assets/img/photos/6.jpg">
      <div class="card-img-overlay pd-30 bg-black-4 d-flex flex-column justify-content-center">
        <p class="tx-white tx-medium mg-b-15">The Ghost Town</p>
        <p class="tx-white tx-13">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum. Lorem ipsum dolor sit amet consictetur...</p>
        <p class="tx-13 mg-b-0"><a class="tx-white" href="javascript:void(0);">Read more</a></p>
      </div>
      </div>`,
    `<div class="card custom-card card-draggable">
      <div class="card-header tx-medium">
        Description
      </div>
      <div class="card-body">
        <p class="mg-b-0">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum. Lorem ipsum dolor sit amet consictetur...</p>
      </div>
    </div>`,
    `<div class="card custom-card card-draggable">
    <img alt="Image" class="img-fluid card-img-top" src="./assets/img/photos/1.jpg">
    <div class="card-body">
      <p class="card-text">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum.</p>
    </div>
    </div>`
  ]
  BAG = "DRAGULA_EVENTS";
  subs = new Subscription();
doneList: any;
  ngOnInit(): void {

  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
