import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'check-out',
        component: CheckoutComponent
      },
      {
        path: 'product-details',
        component: ProductDetailsComponent
      },
      {
        path: 'shop',
        component: ShopComponent
      },
      {
        path: 'wishlist',
        component: WishlistComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
