import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatSortModule } from '@angular/material/sort';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuDevComponent } from './components/menu/menu-dev/menu-dev.component';
import { MenuMemberComponent } from './components/menu/menu-member/menu-member.component';
import { MenuAdmin1Component } from './components/menu/menu-admin1/menu-admin1.component';
import { MenuSaleComponent } from './components/menu/menu-sale/menu-sale.component';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    FooterComponent,
    MenuDevComponent,
    MenuMemberComponent,
    MenuAdmin1Component,
    MenuSaleComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    MatSortModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
