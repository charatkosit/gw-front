import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { ProductsComponent } from './products/products.component';
import { MainComponent } from './main/main.component';
import { PreOrderComponent } from './pre-order/pre-order.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsComponent,
    MainComponent,
    PreOrderComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    StockRoutingModule
  ]
})
export class StockModule { }
