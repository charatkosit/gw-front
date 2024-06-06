import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { MainComponent } from './main/main.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CarouselModule,
    CommonModule,
    PosRoutingModule
  ]
})
export class PosModule { }
