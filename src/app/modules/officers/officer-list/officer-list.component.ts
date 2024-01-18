import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfficerService } from 'src/app/services/officer.service';
declare var $: any;

@Component({
  selector: 'app-officer-list',
  templateUrl: './officer-list.component.html',
  styleUrls: ['./officer-list.component.css']
})
export class OfficerListComponent implements OnInit {
  data: any[] = [];
  constructor(
    private officerService: OfficerService,
    private router: Router,) { }

  ngOnInit(): void {
    this.officerService.getData().subscribe(data => {
      this.data = data;
      console.log(data)

      $(document).ready(() => {
        var table = $('#example1').DataTable({
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
          stateSave: true,
          data: this.data,
          columns: [
            { data: 'firstName', title: 'ชื่อ', className: "text-center" },
            { data: 'lastName', title: 'นามสกุล', className: "text-center" },
            { data: 'phone', title: 'โทรศัพท์', className: "text-center" },
            { data: 'idOfficer', title: 'บัตรพนักงาน', className: "text-center" },
            { data: 'token', title: 'หมายเลขบัตรอนุญาต', className: "text-center" },
            { data: 'multiSelectFloor', title: 'ติดต่อชั้น', className: "text-center" },
            {
              title: 'แก้ไข',
              className: 'text-center',
              data: null,
              render: function (data: any, type: any, row: any) {
                // console.log(`tax is ${row.FullTaxNumber}`);
                // return '<button class="btn btn-warning btn-edit" data-id="' + row.id + '" data-docduedate="' + row.DocDueDate + '">แก้ไข</button>';
                // return '<button class="btn btn-info btn-edit" data-id="'+ row.id + '">แก้ไข </button> <button class="btn btn-danger btn-delete" data-id="'+ row.id + '">ลบ</button>';
                return `<button class="btn btn-info btn-edit" data-id="${row.id}">แก้ไข</button> <button class="btn btn-danger btn-delete" data-id="${row.id}">ลบ</button>`;
                // return `<div class="button-container">
                //            <button class="btn btn-info btn-edit" data-id="${row.id}">แก้ไข</button>
                //            <button class="btn btn-danger btn-delete" data-id="${row.id}">ลบ</button>
                //         </div>`;


              }
            },
            // {
            //   title: 'ลบ',
            //   className: 'text-center',
            //   data: null,
            //   render: function (data: any, type: any, row: any) {
            //     // console.log(`tax is ${row.FullTaxNumber}`);
            //     // return '<button class="btn btn-danger btn-delete" data-id="' + row.id + '" data-docduedate="' + row.DocDueDate + '">ลบ</button>';
            //     return '<button class="btn btn-danger btn-delete" data-id="'+ row.id + '">ลบ</button>';
            //   }
            // },
          ]
        });

        $(document).on('click', '.btn-edit', () => {
          var id = $(event?.target).data('id');

          // this.share.taxNumber = fullTaxNumber;
          // this.share.docDueDate = docduedate;
          console.log(`when edit click: ${id}`);
          // this.log.logEvent(`Button Clicked: invoice-list/รายละเอียด/${fullTaxNumber}`)
          // this.router.navigate(['/invoice-details'])
        });

        $(document).on('click', '.btn-delete', () => {
          var id = $(event?.target).data('id');
          console.log(`when delete click: ${id}`);
      
          this.officerService.delete(id);
          this.officerService.getData().subscribe(data => { this.data = data })


        });
      });
    })
  }

  deleteOfficer(id: number) {
    this.officerService.delete(id);
    this.officerService.getData().subscribe(data => { this.data = data })

  }

}
