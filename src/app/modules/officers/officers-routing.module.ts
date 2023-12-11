import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistComponent } from './regist/regist.component';
import { OfficerListComponent } from './officer-list/officer-list.component';
import { ProfilesComponent } from './profiles/profiles.component';

const routes: Routes = [
  { path: '' ,
  children: [

    { path: "regist",      component: RegistComponent },
    { path: "officer-list",      component: OfficerListComponent },
    { path: "profiles",      component: ProfilesComponent },
    { path: '',           redirectTo: 'dashboard', pathMatch: 'full'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficersRoutingModule { }
