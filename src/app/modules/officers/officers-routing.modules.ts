import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficerListComponent } from './officer-list/officer-list.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
    { path: '' ,
     children: [

       { path: "register",      component: RegisterComponent },
       { path: 'officer-list',  component: OfficerListComponent},
    //    { path: '',           redirectTo: 'login', pathMatch: 'full'}
     ]
   }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficersRoutingModule { }