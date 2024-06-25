import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GarageRoutingModule } from './garage-routing.module';
import { OrderComponent } from './order/order.component';
import { SearchLPComponent } from './search-lp/search-lp.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PickupCarComponent } from './pickup-car/pickup-car.component';
import { MainComponent } from './main/main.component';
import { CustomerComponent } from './customer/customer.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { PromotionComponent } from './promotion/promotion.component';
import { SearchComponent } from './search/search.component'; // a plugin
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin
// ]);


@NgModule({
  declarations: [
  
    OrderComponent,
    SearchLPComponent,
    CalendarComponent,
    PickupCarComponent,
    MainComponent,
    CustomerComponent,
    PromotionComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    GarageRoutingModule
  ]
})
export class GarageModule { }
