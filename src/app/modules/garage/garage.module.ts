import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageRoutingModule } from './garage-routing.module';
import { OrderComponent } from './order/order.component';
import { SearchLPComponent } from './search-lp/search-lp.component';
import { CalendarComponent } from './calendar/calendar.component';
import { PickupCarComponent } from './pickup-car/pickup-car.component';
import { MainComponent } from './main/main.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { PromotionComponent } from './promotion/promotion.component';
import { SearchComponent } from './search/search.component'; // a plugin
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CarListComponent } from './car-list/car-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailListComponent } from './order-detail-list/order-detail-list.component';
import { GetOrderComponent } from './get-order/get-order.component';
import { CarEditModalComponent } from './car-edit-modal/car-edit-modal.component';
import { CarProfileModalComponent } from './car-profile-modal/car-profile-modal.component';
import { TimelineComponent } from './timeline/timeline.component';
import { OrderDetailModalComponent } from './order-detail-modal/order-detail-modal.component';
import { CustomerProfileModalComponent } from './customer-profile-modal/customer-profile-modal.component';
import { CustomerEditModalComponent } from './customer-edit-modal/customer-edit-modal.component';
import { CustomerCreateModalComponent } from './customer-create-modal/customer-create-modal.component';
import { OrderEditModalComponent } from './order-edit-modal/order-edit-modal.component';
import { OrderCreateModalComponent } from './order-create-modal/order-create-modal.component';
import { CarCreateModalComponent } from './car-create-modal/car-create-modal.component';
import { OrderdetailComponent } from './orderdetail/orderdetail.component';


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
    PromotionComponent,
    SearchComponent,
    CustomerListComponent,
    CarListComponent,
    OrderListComponent,
    OrderDetailListComponent,
    GetOrderComponent,
    CarEditModalComponent,
    CarProfileModalComponent,
    TimelineComponent,
    OrderDetailModalComponent,
    CustomerProfileModalComponent,
    CustomerEditModalComponent,
    CustomerCreateModalComponent,
    OrderEditModalComponent,
    OrderCreateModalComponent,
    CarCreateModalComponent,
    OrderdetailComponent
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
