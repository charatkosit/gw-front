import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PreOrderComponent } from './pre-order/pre-order.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'main', component: MainComponent },
      { path: 'pre-order', component: PreOrderComponent },
      { path: '', redirectTo: 'main', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
