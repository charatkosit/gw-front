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
import { CustomDatePipe } from 'src/app/pipe/custom-date.pipe';
import { OrderAddpartModalComponent } from './order-addpart-modal/order-addpart-modal.component';
import { CarEditModalComponent } from './car-edit-modal/car-edit-modal.component';
import { OrderStatusModalComponent } from './order-status-modal/order-status-modal.component';
import { CustomerOrderCreateModalComponent } from './customer-order-create-modal/customer-order-create-modal.component';
import { CarOrderCreateModalComponent } from './car-order-create-modal/car-order-create-modal.component';
import { OrderDetailEditStatusModalComponent } from './order-detail-edit-status-modal/order-detail-edit-status-modal.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { OrderDetailEditPartModalComponent } from './order-detail-edit-part-modal/order-detail-edit-part-modal.component';


// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin
// ]);


@NgModule({
  declarations: [
    // CustomDatePipe,
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
    CarProfileModalComponent,
    TimelineComponent,
    OrderDetailModalComponent,
    CustomerProfileModalComponent,
    CustomerEditModalComponent,
    CustomerCreateModalComponent,
    OrderEditModalComponent,
    OrderCreateModalComponent,
    CarCreateModalComponent,
    OrderdetailComponent,
    OrderAddpartModalComponent,
    CarEditModalComponent,
    OrderStatusModalComponent,
    CustomerOrderCreateModalComponent,
    CarOrderCreateModalComponent,
    OrderDetailEditStatusModalComponent,
    CustomerProfileComponent,
 
    OrderDetailEditPartModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    GarageRoutingModule
  ],
  // exports: [CustomDatePipe]
})
export class GarageModule { }
