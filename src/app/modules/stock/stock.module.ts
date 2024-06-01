import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { ProductsComponent } from './products/products.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    ProductsComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    StockRoutingModule
  ]
})
export class StockModule { }
