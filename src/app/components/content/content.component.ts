import { Component, OnInit } from '@angular/core';
import { OfficerService } from 'src/app/services/officer.service';
import { VisitorService } from 'src/app/services/visitor.service';
import { Sort } from '@angular/material/sort';
import { apiResultFormat, productList } from 'src/app/interfaces/page.model';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import { Router } from '@angular/router';
import { routes } from 'src/app/interfaces/routes';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationService, pageSelection, tablePageSize } from 'src/app/services/pagination.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  initChecked = false;
  public tableData: Array<productList> = [];
  public routes = routes;
  public selectedValue1 = ''
  public selectedValue2 = ''
  public selectedValue3 = ''
  public selectedValue4 = ''
  public selectedValue5 = ''
  
  // pagination variables
  public pageSize = 10;
  public serialNumberArray: Array<number> = [];
  public totalData = 0;
  showFilter = false;
  dataSource!: MatTableDataSource<productList>;
  public searchDataValue = '';
  //** / pagination variables

  officerCount:number = 0;
  visitorCount:number = 0;

  constructor(private officerService: OfficerService,
    private visitorService: VisitorService,
    private sweetalert:SweetalertService,
    private pagination: PaginationService,
    private data: DataService,
    private router: Router) {
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.productList) {
          this.getTableData({ skip: res.skip, limit: res.limit });
          this.pageSize = res.pageSize;
        }
      });
     }

  ngOnInit(): void {
    this.visitorService.getCount().subscribe(data => {
      this.visitorCount = data;
      console.log(data)
    })

    this.officerService.getOfficerCount().subscribe(data => {
      this.officerCount = data;
      console.log(data)
    })
  
  }


  public sortData(sort: Sort) {
    const data = this.tableData.slice();

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.tableData = data.sort((a: any, b: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getProductList().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: productList, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.sNo = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<productList>(this.tableData);
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  deleteBtn() {
    this.sweetalert.deleteBtn();
  }


  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }
}
