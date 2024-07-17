import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { F } from '@fullcalendar/core/internal-common';
import { CarTableService } from 'src/app/services/car-table.service';
import { OrderTableService } from 'src/app/services/order-table.service';
declare var $: any;

@Component({
  selector: 'app-get-order',
  templateUrl: './get-order.component.html',
  styleUrls: ['./get-order.component.css']
})
export class GetOrderComponent {

  data: any[] = [];
  memberId = 'A-004';
  getOrderForm!: FormGroup;

  constructor(
    private order: OrderTableService,
    private fb: FormBuilder,
  ) {
    this.getOrderForm = this.fb.group({
      model: [''],
      brand: [''],
      year: [''],
      color: [''],
      licensePlate: [''],
    })
   }

  ngOnInit(): void {
    this.loadData();

  }

  private loadData(): void {
    this.order.findAll(this.memberId).subscribe(data => {
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
            { data: 'car.licensePlate', title: 'ทะเบียน', className: "text-center" },
            { data: 'car.brand', title: 'แบรนด์', className: "text-center" },
            { data: 'customer.name', title: 'ลูกค้า', className: "text-center" },
            { data: 'sympthom', title: 'อาการเสีย', className: "text-center" },
            { data: 'description', title: 'รายละเอียด', className: "text-center" },
            { data: 'km', title: 'KM', className: "text-center" },
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
    this.order.findAll(this.memberId).subscribe(data => {
      this.data = data;
      var table = $('#example1').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();
    });
  }
  //-------------------------------
  onSubmit() {
    // const data = this.carForm.value;
    // console.log(`data carForm: ${JSON.stringify(data)}`)
    // if (this.carForm.valid) {

    //   const data = this.carForm.value;
    //   console.log(`data carForm: ${JSON.stringify(data)}`)

    //   const carData = {
    //     model: this.carForm.get('model')?.value,
    //     brand: this.carForm.get('brand')?.value,
    //     year: this.carForm.get('year')?.value,
    //     color: this.carForm.get('color')?.value,
    //     licensePlate: this.carForm.get('licensePlate')?.value,
    //     memberId: this.memberId
    //   };

    //   this.car.create(carData).subscribe({
    //     next: response => {
    //       console.log('Car created successfully', response);
    //     },
    //     error: error => {
    //       console.error('Error creating car', error);
    //     }
    //   });
    // }


  }
}
