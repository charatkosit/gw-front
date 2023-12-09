import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { VisitorsRoutingModule } from './visitors-routing.module';
import { VisitorListComponent } from './visitor-list/visitor-list.component';



@NgModule({
  declarations: [
    RegisterComponent,
    VisitorListComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    VisitorsRoutingModule,
  ]
})
export class VisitorsModule { }
