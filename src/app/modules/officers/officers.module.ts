import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfficersRoutingModule } from './officers-routing.module';
import { RegistComponent } from './regist/regist.component';
import { OfficerListComponent } from './officer-list/officer-list.component';
import { FormsModule } from '@angular/forms';
import { ProfilesComponent } from './profiles/profiles.component';


@NgModule({
  declarations: [
    RegistComponent,
    OfficerListComponent,
    ProfilesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    OfficersRoutingModule
  ]
})
export class OfficersModule { }
