import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order/order.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '' ,
  children: [

    { path: "main",      component: MainComponent},
    { path: "order",     component: OrderComponent},
    { path: "search",    component: SearchComponent},
    { path: '',           redirectTo: 'main', pathMatch: 'full'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GarageRoutingModule { }
