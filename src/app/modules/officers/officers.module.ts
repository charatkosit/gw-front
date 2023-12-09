import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { OfficerListComponent } from './officer-list/officer-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegisterComponent,
    OfficerListComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class OfficersModule { }
