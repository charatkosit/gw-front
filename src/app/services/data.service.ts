import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiResultFormat } from '../interfaces/page.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }


  public getCountryList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/countrys.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpenseCategoryList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/expenseCategoryList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getExpenseList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/expenseList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCustomerList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/customerList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getQuotationList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/quotationList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTransferList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/transferList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getUserList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/userList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }

  public getInvoiceReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/invoiceReport.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getProductList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/productList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCategoryList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/categoryList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSubcategoryList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/subcategoryList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getBrandList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/brandList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSalesList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/salesList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSalesReturnLists(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/salesreturnLists.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPurchaseList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/purchaseList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSalesReturnList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/salesreturnLists.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPurchaseReturnList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/purchaseReturnList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSupplierList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/supplierList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPeopleUserList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/peopleUserList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStoreList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/storeList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getStateList(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/stateList.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPurchaseOrderReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/purchaseOrderReport.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getInventoryReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/inventoryReport.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSalesReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/salesReport.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPurchaseReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/purchaseReport.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCustomerReport(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/customerReport.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPaymentSettings(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/paymentSettings.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getCurrencySettings(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/currencySettings.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getGroupPermission(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/groupPermission.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getTaxRates(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/taxRates.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSupplierReport1(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/supplierReport1.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSupplierReport2(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/supplierReport2.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSupplierReport3(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/supplierReport3.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getSalesListModal(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/salesListModal.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPos1(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/pos1.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPos2(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/pos2.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getPos3(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/pos3.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEditPermission(): Observable<apiResultFormat> {
    return this.http.get<apiResultFormat>('assets/JSON/editpermisssion.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
  public getEvents() {
    return this.http.get('assets/JSON/scheduleevents.json').pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getDataTable() {
    return this.http.get<apiResultFormat>('assets/JSON/datatables.json').pipe(
      map((res: apiResultFormat) => {
        return res;
      })
    );
  }
}

