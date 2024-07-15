import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { CarListComponent } from './car-list/car-list.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailListComponent } from './order-detail-list/order-detail-list.component';
import { GetOrderComponent } from './get-order/get-order.component';

const routes: Routes = [
  { path: '' ,
  children: [

    { path: "main",      component: MainComponent},
    { path: "order",     component: OrderComponent},
    { path: "search",    component: SearchComponent},
    { path: "car-list",  component: CarListComponent},
    { path: "customer-list",      component: CustomerListComponent},
    { path: "order-list",         component: OrderListComponent},
    { path: "order-detail-list",  component: OrderDetailListComponent},
    { path: "get-order",          component: GetOrderComponent},
    { path: '',           redirectTo: 'main', pathMatch: 'full'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GarageRoutingModule { }
