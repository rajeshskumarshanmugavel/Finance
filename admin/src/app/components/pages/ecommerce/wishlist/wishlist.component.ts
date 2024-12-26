import { Component, OnInit } from '@angular/core';
import { wishlist, WishlistList } from './wishlist';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  page = 1;
  public wishList: wishlist[];
  constructor() {
    this.wishList = WishlistList
   }
  ngOnInit(): void {
  }
  RemoveElementFromObjectArray(key: any) {
    this.wishList.forEach((value,index)=>{
        if(value.id==key) this.wishList.splice(index,1);
    });
  }
}
