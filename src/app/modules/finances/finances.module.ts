import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancesRoutingModule } from './finances-routing.module';
import { MainComponent } from './main/main.component';
import { QuotationComponent } from './quotation/quotation.component';
import { CnComponent } from './cn/cn.component';
import { BillingNoteComponent } from './billing-note/billing-note.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { DepositComponent } from './deposit/deposit.component';


@NgModule({
  declarations: [
    MainComponent,
    QuotationComponent,
    CnComponent,
    BillingNoteComponent,
    InvoiceComponent,
    DepositComponent
  ],
  imports: [
    CommonModule,
    FinancesRoutingModule
  ]
})
export class FinancesModule { }
