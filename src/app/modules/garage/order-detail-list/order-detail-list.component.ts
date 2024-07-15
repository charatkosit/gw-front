import { Component } from '@angular/core';
import { OrderDetailTableService } from 'src/app/services/order-detail-table.service';
declare var $: any;

@Component({
  selector: 'app-order-detail-list',
  templateUrl: './order-detail-list.component.html',
  styleUrls: ['./order-detail-list.component.css']
})
export class OrderDetailListComponent {

  constructor(private orderDetail:OrderDetailTableService) { }

  data: any[] = [];
  orderDetailId = 3;


  ngOnInit(): void {
    this.loadData();

  }

 private loadData(): void{
  this.orderDetail.getOrderDetailById(this.orderDetailId).subscribe(data => {
    this.data = data;
    console.log(`data is ${JSON.stringify(this.data)}`);

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
        order: [[6, 'desc']], // เรียงลำดับตามเวลาเข้า
        columns: [
          { data: 'id', title: 'id', className: "text-center" },
          { data: 'model', title: 'รุ่น', className: "text-center" },
          { data: 'brand', title: 'แบรนด์', className: "text-center" },
          { data: 'year', title: 'ปี', className: "text-center" },
          { data: 'color', title: 'สี', className: "text-center" },
          { data: 'licensePlate', title: 'ทะเบียน', className: "text-center" },
          {
            title: 'สถานะ',
            className: 'text-center',
            data: null,
            render: function (data: any, type: any, row: any) {
              console.log(`row is ${JSON.stringify(row.token)}`);
              if (row.checkOut == null) {
                return '<button class="btn btn-warning btn-returnCard" data-token="' + row.token + '">รอคืนบัตร</button>';
              } else {
                return '<button class="btn btn-default btn-returnCard" data-token="' + row.token + '" disabled>คืนแล้ว</button>';
              }
            }
          },
        ]
      });
      // $(document).on('click', '.btn-returnCard', () => {
      //   var token = $(event?.target).data('token');
      //   console.log(`when btn-retrunCard click: ${token}`);
      //   this.onCheckOut(token);

      // });
    });
  })
 }
  ngOnDestroy(): void {
    try {
      // Your cleanup code or method calls
      this.cleanup();
    } catch (error) {
      console.error('Error during ngOnDestroy:', error);
    }
  }

  private cleanup(): void {
    // Cleanup logic here
    console.log('Cleaning up resources...');
  }

  private reloadDataTable(): void {
    this.orderDetail.getOrderDetailById(this.orderDetailId).subscribe(data => {
      this.data = data;
      var table = $('#example1').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();
    });
  }
//-------------------------------
}
