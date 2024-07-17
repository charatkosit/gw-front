import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { newOrderDto } from 'src/app/interfaces/newOrderDto';
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

  constructor(private order: OrderTableService,
    private fb: FormBuilder,

  ) {
    this.orderForm = this.fb.group({
      memberId: this.memberId,
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      model: [''],
      brand: [''],
      year: [''],
      color: [''],
      licensePlate: ['', Validators.required],
      sympthom: ['', Validators.required],
      description: [''],
      km: ['']
    })
  }

  ngOnInit(): void {
    this.loadData();

  }

  private loadData(): void {
    this.order.findAll(this.memberId).subscribe(data => {
      this.data = data;
      console.log(`data order is ${JSON.stringify(this.data)}`);

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
          // order: [[6, 'desc']], // เรียงลำดับตามเวลาเข้า
          columns: [
            { data: 'id', title: 'id', className: "text-center" },
            { data: 'car.id', title: 'car-id', className: "text-center" },
            { data: 'customer.id', title: 'cus-id', className: "text-center" },
            { data: 'car.brand', title: 'แบรนด์', className: "text-center" },
            { data: 'car.licensePlate', title: 'ทะเบียน', className: "text-center" },
            { data: 'customer.name', title: 'ลูกค้า', className: "text-center" },
            { data: 'sympthom', title: 'อาการเสีย', className: "text-center" },
            { data: 'description', title: 'รายละเอียด', className: "text-center" },
            { data: 'km', title: 'รับบริการ (Km)', className: "text-center" },
            { data: 'dateIn', title: 'วันที่เข้า', className: "text-center" },
            { data: 'status', title: 'สถานะ', className: "text-center" },

            {
              title: 'กิจกรรม',
              className: 'text-center',
              data: null,
              render: function (data: any, type: any, row: any) {
                console.log(`row is ${JSON.stringify(row.token)}`);
                if (row.checkOut == null) {
                  return `<button class="btn btn-warning btn-addOrderDetail" data-id="${row.id}">เพิ่มอะไหล่</button>`;
                } else {
                  return '<button class="btn btn-default btn-returnOrderd" data-token="' + row.token + '" disabled>คืนแล้ว</button>';
                }
              }
            },
          ]
        });
        $(document).on('click', '.btn-addOrderDetail', (event: any) => {
          var orderId = $(event.target).data('id');
          console.log(`when addOrderDetail click orderId is: ${orderId}`);
          // this.lookupCustomerProfile(customerId);
        });
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

  onSubmitCreate(orderForm: FormGroup) {

    console.log(`From orderModal onSubmit, ${JSON.stringify(orderForm.value)}`);
    const data = orderForm.value;

    console.log(`data orderForm: ${JSON.stringify(data)}`)

    // เตรียมข้อมูล สำหรับ create order ใหม่
    const orderData = {
      memberId: this.memberId,
      customer: {
        name: orderForm.value.name,
        phone: orderForm.value.phone,
        address: orderForm.value.address
      },
      car: {
        model: orderForm.value.model,
        brand: orderForm.value.brand,
        year: orderForm.value.year,
        color: orderForm.value.color,
        licensePlate: orderForm.value.licensePlate,
      },
      order: {
        sympthom: orderForm.value.sympthom,
        description: orderForm.value.description,
        km: orderForm.value.km
      }

    };

    console.log(`orderData1: ${JSON.stringify(orderData)}`);
    this.order.create(this.memberId, orderData).subscribe({
      next: response => {
        console.log('order created successfully', response);
        this.reloadDataTable();
      },
      error: error => {
        console.error('Error creating order', error);
      }
    });
  }




  createOrder() {
    const orderData = {
      sympthom: 'Model S',
      description: 'Tesla',
      km: 2022,
      customerId: 1,
      carId: 1
    };

    this.order.create(this.memberId, orderData).subscribe({
      next: response => {
        console.log('order created successfully', response);
      },
      error: error => {
        console.error('Error creating order', error);
      }
    });
  }
}
