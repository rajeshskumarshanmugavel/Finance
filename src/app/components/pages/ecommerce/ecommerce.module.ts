import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    ShopComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    WishlistComponent
  ],
  imports: [
    // ArchwizardModule,
    CommonModule,
    EcommerceRoutingModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class EcommerceModule { }
