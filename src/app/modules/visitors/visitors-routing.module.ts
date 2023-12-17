import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { VisitorListComponent } from './visitor-list/visitor-list.component';
import { RegistComponent } from './regist/regist.component';

const routes: Routes = [
    { path: '' ,
     children: [

       { path: "register",      component: RegisterComponent },
       { path: "regist",        component: RegistComponent },
       { path: 'visitor-list',  component: VisitorListComponent},
       { path: '',           redirectTo: 'visitor-list', pathMatch: 'full'}
     ]
   }
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorsRoutingModule { }