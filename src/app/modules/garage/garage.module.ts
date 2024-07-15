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
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CarListComponent } from './car-list/car-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailListComponent } from './order-detail-list/order-detail-list.component';
import { OrderDetailEditComponent } from './order-detail-edit/order-detail-edit.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { CarEditComponent } from './car-edit/car-edit.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { GetOrderComponent } from './get-order/get-order.component';


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
    SearchComponent,
    CustomerListComponent,
    CarListComponent,
    OrderListComponent,
    OrderDetailListComponent,
    OrderDetailEditComponent,
    OrderEditComponent,
    CarEditComponent,
    CustomerEditComponent,
    GetOrderComponent
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
