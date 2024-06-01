import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepairRoutingModule } from './repair-routing.module';
import { MainComponent } from './main/main.component';
import { HoistComponent } from './hoist/hoist.component';


@NgModule({
  declarations: [
    MainComponent,
    HoistComponent
  ],
  imports: [
    CommonModule,
    RepairRoutingModule
  ]
})
export class RepairModule { }
