import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderTableService } from 'src/app/services/order-table.service';
declare var $: any;

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  orderForm!: FormGroup;
  data: any[] = [];
  memberId = 'A-004';

 constructor(private order:OrderTableService,
             private fb: FormBuilder,

 ) {
   this.orderForm = this.fb.group({
     sympthom: ['', Validators.required],
     description: ['', Validators.required],
     km: ['']
   })
 }
  ngOnInit(): void {
    this.loadData();

  }

 private loadData(): void{
  this.order.findAll(this.memberId).subscribe(data => {
    this.data = data;
    console.log(`data order is ${JSON.stringify(this.data)}`);

    $(document).ready(() => {
      var table = $('#example2').DataTable({
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
        // order: [[6, 'desc']], // เรียงลำดับตามเวลาเข้า
        columns: [
          { data: 'id',               title: 'id',          className: "text-center" },
          { data: 'sympthom',         title: 'ทะเบียนรถ',    className: "text-center" },
          { data: 'description',      title: 'รายละเอียด',    className: "text-center" },
          { data: 'km',               title: 'รับบริการ (Km)', className: "text-center" },
  
          {
            title: 'สถานะ',
            className: 'text-center',
            data: null,
            render: function (data: any, type: any, row: any) {
              console.log(`row is ${JSON.stringify(row.token)}`);
              if (row.checkOut == null) {
                return '<button class="btn btn-warning btn-returnOrderd" data-token="' + row.token + '">รอคืนบัตร</button>';
              } else {
                return '<button class="btn btn-default btn-returnOrderd" data-token="' + row.token + '" disabled>คืนแล้ว</button>';
              }
            }
          },
        ]
      });
      // $(document).on('click', '.btn-returnOrderd', () => {
      //   var token = $(event?.target).data('token');
      //   console.log(`when btn-retrunOrderd click: ${token}`);
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
    this.order.findAll(this.memberId).subscribe(data => {
      this.data = data;
      var table = $('#example2').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();
    });
  }
//-------------------------------

  onSubmit() {
    const data = this.orderForm.value;
    console.log(`data orderForm: ${JSON.stringify(data)}`)
    if (this.orderForm.valid) {

      const data = this.orderForm.value;
      console.log(`data orderForm: ${JSON.stringify(data)}`)

      const orderData = {
        model: this.orderForm.get('model')?.value,
        brand: this.orderForm.get('brand')?.value,
        year: this.orderForm.get('year')?.value,
        color: this.orderForm.get('color')?.value,
        licensePlate: this.orderForm.get('licensePlate')?.value,
        memberId: this.memberId
      };

      this.order.create(this.memberId,orderData).subscribe({
        next: response => {
          console.log('order created successfully', response);
          this.reloadDataTable();
        }, 
        error: error => {
          console.error('Error creating order', error);
        }
      });
    }


  }


  createOrder() {
    const orderData = {
      sympthom: 'Model S',
      description: 'Tesla',
      km: 2022,
      customerId: 1,
      carId: 1
    };

    this.order.create(this.memberId,orderData).subscribe({
      next: response => {
        console.log('order created successfully', response);
      },
      error: error => {
        console.error('Error creating order', error);
      }
    });
  }
}
