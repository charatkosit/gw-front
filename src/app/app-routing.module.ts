import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';

const routes: Routes = [
  {path: "", pathMatch:"full", redirectTo:"auth"},
  {path:'dashboard', component: ContentComponent},
  {path: 'garage', loadChildren: () => import('./modules/garage/garage.module').then(m => m.GarageModule) },
  {path: 'finances', loadChildren: () => import('./modules/finances/finances.module').then(m => m.FinancesModule) },
  {path: 'stock', loadChildren: () => import('./modules/stock/stock.module').then(m => m.StockModule) },
  {path: 'expense', loadChildren: () => import('./modules/expense/expense.module').then(m => m.ExpenseModule) },
  {path: 'repair', loadChildren: () => import('./modules/repair/repair.module').then(m => m.RepairModule) },
  {path: 'delivery', loadChildren: () => import('./modules/delivery/delivery.module').then(m => m.DeliveryModule) },
  {path: 'reports', loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule) },
  {path: 'pos', loadChildren: () => import('./modules/pos/pos.module').then(m => m.PosModule) },
  // {path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
