import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
  { path: '' ,
  children: [

    { path: "setup",      component: SetupComponent },
    { path: '',           redirectTo: 'dashboard', pathMatch: 'full'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
