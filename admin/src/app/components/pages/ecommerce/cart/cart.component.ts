import { Component, OnInit } from '@angular/core';

interface cart{
  id: number;
  image: string;
  size: string;
  color: string;
  title: string;
  quantity: number;
  price: string;
  statusText: string;
  status: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  objectArray: cart[];
  constructor() { 
    this.objectArray = [
      { id: 1, image: "./assets/img/ecommerce/01.jpg", size:'XXl', color:'purple color', title : "PARTY WEAR", price : "$80.00	", status: 'danger' ,statusText :'Out of stock', quantity: 1},
      { id: 2, image: "./assets/img/ecommerce/09.jpg", size:'XL', color:'Red color', title : "FLOWER POT", price : "$50.30", status: 'success' ,statusText : 'In stock', quantity: 2},
      { id: 3, image: "./assets/img/ecommerce/08.jpg", size:'M', color:'', title : "MENS WEAR", price : "$79.90", status: 'danger' ,statusText : 'Out of stock', quantity: 1},
      { id: 4, image: "./assets/img/ecommerce/02.jpg", size:'11-12 inches', color:'', title : "EAR PHONES", price : "$79.90", status: 'success' ,statusText : 'In stock', quantity: 1},

    ];
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){
    const plus:any = document.querySelectorAll('.plus');
    const minus:any = document.querySelectorAll('.minus');
    function perfectChart(){
      plus.forEach( (element:any)=>{
        let parentDiv = element.parentElement.parentElement;
          element.addEventListener('click',()=>{ parentDiv.children[0].children[1].value++ })
      } )
      minus.forEach( (element:any)=>{
        let parentDiv = element.parentElement.parentElement;
          element.addEventListener('click',()=>{
             if(parentDiv.children[0].children[1].value > 0){parentDiv.children[0].children[1].value-- }
          })
      } )
    }
    perfectChart()
  }
  RemoveElementFromObjectArray(key: any) {
    this.objectArray.forEach((value,index)=>{
        if(value.id==key) this.objectArray.splice(index,1);
    });
  }
}
