import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '' ,
   children: [
     { path: "login", component: LoginComponent },
    //  { path: 'profile',    component: ProfileComponent},
    //  // { path: "content", component: ContentComponent },
    //  { path: "forgot", component: ForgotpwdComponent },
    //  { path: "register", component: RegisterComponent },
    //  { path: 'changepwd',  component: ChangepwdComponent},
     { path: '',           redirectTo: 'login', pathMatch: 'full'}
   ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
