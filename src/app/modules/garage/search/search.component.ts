import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartlistNew, brandC, goApiPartlistNew } from 'src/app/interfaces/goApiPartlist';
import { Router } from '@angular/router';

import { ApiEpcDetails } from 'src/app/interfaces/ApiEpcDetails'
import { EpcService } from 'src/app/services/epc.service';

import { environment } from 'src/environments/environment';
// import * as CryptoJS from 'crypto-js';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';
import { debounceTime, switchMap } from 'rxjs';
import { DICTIONARY } from 'src/app/interfaces/Dictionary';
import { ShareService } from 'src/app/services/share.service';
import { SearchService } from 'src/app/services/search.service';

// import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  //-------------ประกาศตัวแปร------------------------
  searchForm!: FormGroup;

  partlistNew: PartlistNew[] = [];
  apiPartlistNew!: goApiPartlistNew;



  // สร้างอาร์เรย์เก็บ ItemCode ที่ค้นหาได้
  arrayItemCode: string[] = [];


  totalFound: number = 0;
  brandCounts: brandC[] = [];
  numBrandCounts: number = 0;
  arrayBrand: string[] = [];
  brand_0: string = '';


  // customer_code = this.share.customer_code;
  // customer_code: any = localStorage.getItem(environment.user_code)
  discount: number = 0;
  netPricePerUnit: number = 0;
  billDiscount: number = 0;
  specialPrice: number = 0;
  searchTermControl: any;
  tempSearch: any;
  toggle: boolean = true;

  searchQuery: string | null = '';

  isImageFullscreen = false;

  //-------------------------------------------------------
  constructor(
    private fb: FormBuilder,
    private search: SearchService,
    private share: ShareService,
    private epc: EpcService,
    private router: Router,


  ) {
  }

  ngOnInit(): void {
    // this.partlist = this.recoverHistoryQuery(this.historyQuery);
    console.log()
    this.searchForm = this.fb.group({
      searchTerm: ['', Validators.maxLength(30)],
    })


    this.searchTermControl = this.searchForm.get('searchTerm');

    if (this.searchTermControl) {
      this.searchTermControl.valueChanges.pipe(
        debounceTime(300), // รอ 300 มิลลิวินาทีก่อนเรียก API
        switchMap((value: string) => {
          //   ตรวจสอบคำผิด และแก้ไข
          const correctedTerm = this.checkSpelling(value);
          console.log(`correctedTerm: ${correctedTerm}`);

          return this.search.getPartlistBySingleSearch(`term=${correctedTerm}`)
        })
      ).subscribe((res: goApiPartlistNew) => {

        this.apiPartlistNew = res;
        this.partlistNew = this.apiPartlistNew.data
        this.totalFound = this.apiPartlistNew.resultFound
        this.brandCounts = this.apiPartlistNew.brandCount;
        this.numBrandCounts = this.brandCounts.length;
        // เอาค่า ItemCode มาเก็บไว้ในอาร์เรย์
        this.arrayItemCode = this.partlistNew.map(item => item.ItemCode);

        // สร้างอาร์เรย์ใหม่ที่มีเฉพาะ ItemCode
        this.partlistNew = this.partlistNew.map(item => ({ ...item, count: 0 }));
        // const nCrf = this.getCrfTotal();
        // console.log(`nCrf =${nCrf}`)
        console.log(`brandCounts = ${JSON.stringify(this.brandCounts)}`)
        console.log(`brandCounts.lenght = ${JSON.stringify(this.brandCounts.length)}`)
        console.log(`partlistNew = ${JSON.stringify(this.partlistNew)}`)

        // อัปเดตตาราง DataTables
        // Successfully deleted the officer, now update the table 
        this.updateDataTable();

      }
      )


    }


    // สร้างตาราง
    $(document).ready(() => {
      var table = $('#example1').DataTable({
        responsive: true,
        lengthChange: true,
        autoWidth: false,
        searching: false,  //ปิด
        paging: true,
        info: true,
        ordering: true,
        language: {
          lengthMenu: 'แสดง _MENU_ แถว',
          zeroRecords: 'ไม่พบข้อมูล',
          info: 'แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว',
          infoEmpty: 'ไม่มีข้อมูลที่ต้องการแสดง',
          infoFiltered: '(กรองจากทั้งหมด _MAX_ แถว)',
          search: 'ค้นหา:',
          paginate: {
            first: 'หน้าแรก',
            last: 'หน้าสุดท้าย',
            next: 'ถัดไป',
            previous: 'ก่อนหน้า'
          }
        },
        stateSave: false,
        data: this.partlistNew,
        columns: [
          {
            data: 'Brand', title: 'แบรนด์', className: "text-center",
            render: (data: any, type: any, row: any) => {
              //ตรวจสอบว่ามี รายชื่อภาพ อยู่ใน this.share.imageList หรือไม่ 
              if (this.share.imgList.includes(row.ItemCode)) {
                return `${data} <span class="right badge badge-success info-badge">Info</span>`;
              } else {
                return data;
              }
            }
          },
          { data: 'ItemName', title: 'รายการสินค้า', className: "text-left" },
          {
            data: 'ItemCode', title: 'บาร์โคด', className: "text-center",
            render: (data: any, type: any, row: any) => {
              //ตรวจสอบว่ามี รายชื่อภาพ อยู่ใน this.share.crossRef หรือไม่ 
              const part = this.share.crossRef.find((p: any) => p.partId === row.ItemCode);
              if (part) {
                return `${data}  <span class="right badge badge-warning crossref-badge">${part.count}</span>`;
              } else {
                return data;
              }
            }
          },
          { data: 'ItemCodeNew', title: 'บาร์โคด(ใหม่)', className: "text-center" },
          { data: 'Model', title: 'รุ่น', className: "text-center" },
          { data: 'RetailPrice', title: 'ราคาปลีก', className: "text-center" },
          // {
          //   data: 'Qty', title: 'สต๊อก', className: "text-center",
          //   render: function (data: number, type: any, row: any) {
          //     if (row.Grade3D.startsWith('A')) return Math.ceil(data / 2); // ถ้าเป็นสินค้าเกรด A ให้แสดงครึ่งหนึ่ง

          //     // ตรวจสอบหากค่า onHandQty เท่ากับ 0
          //     if (data === 0) {
          //       // แสดง balloon ที่มีข้อความ Pre-Order
          //       return '<span class="right badge badge-success">Pre-Order</span>';
          //     } else {
          //       // หากไม่เท่ากับ0 แสดงค่า onHandQty ปกติ
          //       return data;
          //     }
          //   }
          // },
          // { data: 'Grade3D', title: 'Grade', className: "text-center" },
          {
            data: 'แสดง', title: 'Action', className: "text-center",
            render: function (data: any, type: any, row: any) {
              return `<button class="btn btn-outline-success btn-block btn-select" data-id="${row.id}">
                            <i class="fas fa-cart-plus"></i> <b>เพิ่มใน ใบเสนอราคา</b>
                      </button>`
            }
          }
        ],

        createdRow: (row: any, data: any, dataIndex: any) => {
          $(row).find('.info-badge').on('click', () => {
            console.log(`Show image for item code: ${data.ItemCode}`);
            showEpcImage(data);
          });

          $(row).find('.crossref-badge').on('click', () => {
            console.log(`crossRef for item code: ${data.ItemCode}`);
            showCrossRef(data.ItemCode);
          });
        }
      });




      const showEpcImage = (row: any) => {
        // Implement the logic to show the image for the given itemCode
        console.log(`Show image for item code2: ${row.ItemCode}`);
        this.showPopupEpcImage(row);
      }

      const showCrossRef = (ItemCode: string) => {
        // Implement the logic to show the image for the given itemCode
        console.log(`showCrossRef: ${ItemCode}`);
        this.onClickEpcDetails(ItemCode);
      }

    });


  }


  checkSpelling(term: string): string {
    const words = term.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (DICTIONARY[word]) {
        words[i] = DICTIONARY[word];
      }
    }
    return words.join(' ');
  }


  addToCartOrder(customer_code: string, selectedData: PartlistNew) {

    console.log('this is addToCartOrder')



    let netPricePerUnit: number;
    let discount: number;
    let subTotal: number;
    let sumRetailPrice: number;
    let sumBillDiscount: number;

  }


  encodeMD5(message: string): string {
    return CryptoJS.MD5(message).toString();
  }

  updateDataTable() {
    // อัปเดตข้อมูลใน DataTable
    const table = $('#example1').DataTable();
    table.clear();
    table.rows.add(this.partlistNew);
    table.draw();
  }


  onAlertAddPreOrderCart() {
    $(function () {
      var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1600
      });


      Toast.fire({
        icon: 'success',
        title: 'เพิ่มสินค้า Pre-Order'
      });
    });
  }



  showPopupEpcImage(row: any) {
    const imagesname = row.ItemCode;
    const hashImagesname = this.encodeMD5(imagesname) + '.png';
    console.log(hashImagesname)
    // URL ของรูปภาพ
    // const imageUrl = `/apiimg/images/${imagesname}`; // แทนที่ด้วย URL รูปภาพของคุณ
    const imageUrl = `https://epc2-goplus.ddns.net/images/${hashImagesname}`;
    Swal.fire({
      title: 'ตัวอย่างภาพ',
      html: `<img src="${imageUrl}" id="customImage" style="width: 80%;">`,
      showCloseButton: true,
      focusConfirm: false,
      width: 'auto',
      padding: '1em',
      didOpen: () => {
        const image: any = document.getElementById('customImage');
        image.addEventListener('click', () => {
          // ขยายภาพ
          if (image.style.maxWidth === '100%') {
            image.style.maxWidth = 'none';
            image.style.cursor = 'zoom-out';
            // Swal.update({
            //     width: '100vw',
            //     heightAuto: false
            // });
          } else {
            image.style.maxWidth = '100%';
            image.style.cursor = 'zoom-in';
            // Swal.update({
            //     width: 'auto',
            //     heightAuto: true
            // });
          }
        });
      }
    });

  }




  getCrfTotal(partid: string = 'TOY-042260L020'): any {
    this.epc.getCrfTotal(partid).subscribe(
      {
        next: (data: any) => {
          console.log(`data ${JSON.stringify(data.resultFound)}`)
          return data.resultFound;
        },
        error: (error: any) => {
          console.error('There was an error!', error);
        }
      }

    )
  }

  getEpcVersion() {
    this.epc.getVersion().subscribe({
      next: (data: any) => {
        console.log(`data: ${JSON.stringify(data)}: ${data}`)
        return data;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    }

    )

  }

  onClickEpcDetails(partid: string) {
    console.log(`onClickEpcDetails: ${partid}`)
    this.epc.getEpcSearch(partid).subscribe((res: ApiEpcDetails) => {
      this.share.epcData = res;
      this.router.navigate(['/epc-details'])
    })
  }



  insertBrand(brand: string) {


    // this.arrayBrand.push(brand);
    // console.log(`arrayBrand: ${this.arrayBrand}`);
    // let test = this.arrayBrand.join(' ');
    // console.log(`test: ${test}`);

    // console.log(`insertBrand: ${brand}`);

    // console.log(`searchTermControl : ${this.searchTermControl.value}`)
    // console.log(`tempSearch : ${this.tempSearch}`);

  
      if (this.toggle) {
        this.brand_0 = brand;  //จำค่า brand ไว้ก่อน  
        this.tempSearch = this.searchTermControl.value;
        this.searchTermControl.setValue(`${this.searchTermControl.value} ${brand} `);
        this.toggle = false;
        this.arrayBrand = [];
      } else {
        this.searchTermControl.setValue(this.tempSearch);
        this.toggle = true;
        this.arrayBrand = [];
      }


  }


  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;

    if (currentValue === '') {
      this.onClear();
    }
  }

  onClear() {
    console.log('Search input cleared');
    this.toggle = true;
    // ทำสิ่งที่คุณต้องการหลังจากการกด clear
  }


}

