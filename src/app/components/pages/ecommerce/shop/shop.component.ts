import { Component, OnInit } from '@angular/core';

interface shopType {
  id: number;
  img1: string;
  img2: string;
  Title: string;
  rating: number;
  newPrice: string;
  oldPrice: string;
}

const shopList : shopType[] = [
  {id: 1, img1: "./assets/img/ecommerce/9.jpg", img2:'./assets/img/ecommerce/09.jpg', Title: 'GLASS FLOWER POT', rating:1, newPrice:'$55', oldPrice: '$59'},
  {id: 2, img1: "./assets/img/ecommerce/8.jpg", img2:'./assets/img/ecommerce/08.jpg', Title: 'MENS PARTY WEAR T-SHIRT', rating:1, newPrice:'$40', oldPrice: '$45'},
  {id: 3, img1: "./assets/img/ecommerce/6.jpg", img2:'./assets/img/ecommerce/06.jpg', Title: 'GLASS WITH SOIL GIFT ITEM', rating:1, newPrice:'$95', oldPrice: '$100'},
  {id: 4, img1: "./assets/img/ecommerce/1.jpg", img2:'./assets/img/ecommerce/01.jpg', Title: 'WOMEN PARTY WEAR DRESS', rating:1, newPrice:'$80', oldPrice: '$95'},
  {id: 5, img1: "./assets/img/ecommerce/2.jpg", img2:'./assets/img/ecommerce/02.jpg', Title: 'WHITE EAR BUDS', rating:1, newPrice:'$25', oldPrice: '$35'},
  {id: 6, img1: "./assets/img/ecommerce/3.jpg", img2:'./assets/img/ecommerce/03.jpg', Title: 'SIMPLE WHITE CHAIR', rating:1, newPrice:'$50', oldPrice: '$80'},
  {id: 7, img1: "./assets/img/ecommerce/4.jpg", img2:'./assets/img/ecommerce/04.jpg', Title: 'PINK TEDDY BEAR', rating:1, newPrice:'$45', oldPrice: '$49'},
  {id: 8, img1: "./assets/img/ecommerce/5.jpg", img2:'./assets/img/ecommerce/05.jpg', Title: 'LENCE CAMARA', rating:1, newPrice:'$55', oldPrice: '$69'},
  {id: 9, img1: "./assets/img/ecommerce/6.jpg", img2:'./assets/img/ecommerce/07.jpg', Title: 'SMOOTH AND SOFT KIDS WEAR', rating:1, newPrice:'$70', oldPrice: '$75'},
  {id: 10, img1: "./assets/img/ecommerce/11.jpg", img2:'./assets/img/ecommerce/10.jpg', Title: 'BRANDED ALARAM CLOCK', rating:1, newPrice:'$80', oldPrice: '$95'},
  {id: 11, img1: "./assets/img/ecommerce/13.jpg", img2:'./assets/img/ecommerce/12.jpg', Title: 'BRANDED BLACK HEADSET', rating:1, newPrice:'$550', oldPrice: '$599'},
  {id: 12, img1: "./assets/img/ecommerce/14.jpg", img2:'./assets/img/ecommerce/15.jpg', Title: 'COLORFUL COFFEE CUP', rating:1, newPrice:'$60', oldPrice: '$65'},

]
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  shopData!: shopType[]
  constructor() { 
    this.shopData = shopList
  }

  ngOnInit(): void {
  }

}
