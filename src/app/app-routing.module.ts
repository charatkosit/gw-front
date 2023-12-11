import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';

const routes: Routes = [
  {path: "", pathMatch:"full", redirectTo:"dashboard"},
  {path:'dashboard', component: ContentComponent},
  {path: 'officers', loadChildren: () => import('./modules/officers/officers.module').then(m => m.OfficersModule) },
  {path: 'visitors', loadChildren: () => import('./modules/visitors/visitors.module').then(m => m.VisitorsModule) },
  {path: 'setting', loadChildren: () => import('./modules/setup/setup.module').then(m => m.SetupModule) },
  {path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
