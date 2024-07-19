import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { newOrderDto } from 'src/app/interfaces/newOrderDto';
import { OrderDetailTableService } from 'src/app/services/order-detail-table.service';
import { OrderTableService } from 'src/app/services/order-table.service';
declare var $: any;

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

  showOrderAddpartModal = false;
  showOrderStatusModal = false;

  orderForm!: FormGroup;
  modalAddpartData:any;   //สำหรับส่งข้อมูลขาไป modal 
  modalStatusData:any;   //สำหรับส่งข้อมูลขาไป modal

  data: any[] = [];       //สำหรับเก็บข้อมูลที่ได้จาก api
  memberId = 'A-004';

  constructor(
    private order: OrderTableService,
    private orderdetail: OrderDetailTableService,
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
    this.loadDataToday();
    this.initializeDataTable();
  }


  initializeDataTable() {
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
          // { data: 'car.id', title: 'car-id', className: "text-center" },
          // { data: 'customer.id', title: 'cus-id', className: "text-center" },
          { data: 'car.brand', title: 'แบรนด์', className: "text-center" },
          { data: 'car.licensePlate', title: 'ทะเบียน', className: "text-center" },
          { data: 'customer.name', title: 'ลูกค้า', className: "text-center" },
          { data: 'sympthom', title: 'อาการเสีย', className: "text-center" },
          { data: 'description', title: 'รายละเอียด', className: "text-center" },
          { data: 'km', title: 'รับบริการ (Km)', className: "text-center" },
          { data: 'dateIn', title: 'วันที่เข้า', className: "text-center" },
          {
            data: 'status',
            title: 'สถานะ',
            className: "text-center",
            render: function (data: any, type: any, row: any) {
              if (row.status === 'open') {
                return `<span class="right badge badge-danger badge-click" data-id="${row.id}">${data}</span>`;
              } else {
                return `<span class="right badge badge-success badge-click" data-id="${row.id}">${data}</span>`;

              }
            }
          },
          {
            title: 'กิจกรรม',
            className: 'text-center',
            data: null,
            render: function (data: any, type: any, row: any) {
              console.log(`row is ${JSON.stringify(row.token)}`);
              return `<button class="btn btn-warning btn-addOrderDetail" data-id="${row.id}">เพิ่มอะไหล่</button>`;

            }
          },
        ]
      });
      $(document).on('click', '.badge-click', (event: any) => {
        var orderId = $(event.target).data('id');
        console.log(`when badge click orderId is: ${orderId}`);
        this.orderStatus(orderId);
      });
      $(document).on('click', '.btn-addOrderDetail', (event: any) => {
        var orderId = $(event.target).data('id');
        console.log(`when addOrderDetail click orderId is: ${orderId}`);
        this.orderAddpart(orderId);
      });
    });
  }

  private loadData(): void {
    this.order.findAll(this.memberId).subscribe(data => {
      this.data = data;
      console.log(`data order is ${JSON.stringify(this.data)}`);
      const table = $('#example1').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();
    })
  }

  private loadDataToday(): void {
    this.order.findAllToday(this.memberId).subscribe(data => {
      this.data = data;
      console.log(`data order is ${JSON.stringify(this.data)}`);
      const table = $('#example1').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();
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



  //----------------ก่อนไป modal----------------
  orderAddpart(orderId: number) {
    this.showOrderAddpartModal = true;
    this.modalAddpartData = orderId;  
    console.log(`orderAddpart orderId is: ${orderId}`);
  }

  orderStatus(orderId: number) {
    this.showOrderStatusModal = true;
    this.modalStatusData = orderId;
    console.log(`orderStatus orderId is: ${orderId}`);
  }
  //---------------มาจาก modal----------------

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

  onSubmitAddPart(orderAddpartForm: FormGroup) {
    
    //extract from values
    const orderAddpartData =orderAddpartForm.value;
 

    console.log(`From orderModal onSubmitAddPart, ${JSON.stringify(orderAddpartForm.value)}`);
    this.orderdetail.create(this.memberId,orderAddpartData).subscribe({
      next: response => {
        this.showOrderAddpartModal = false;
        console.log('orderdetail created successfully', response);
      },
      error: error => {
        console.error('Error creating orderdetail', error);
      }
    });
  
  }
  onSubmitStatus(updateStatusForm: FormGroup) {
    const updateStatusData ={
      status: updateStatusForm.value.status,
      solution: updateStatusForm.value.solution
   
    }
     const orderId = updateStatusForm.value.orderId;
    this.order.update(+orderId,updateStatusData).subscribe({
      next: response => {
        console.log('order updated successfully', response);
        this.reloadDataTable();
        this.showOrderStatusModal = false;
      },
      error: error => {
        console.error('Error updating order', error);
      }
    });

  }

  closeModal() {
    this.showOrderAddpartModal = false;
  }
  closeStatusModal() {
    this.showOrderStatusModal = false;
  }
  //------------------------------------
  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.loadDataToday();
    } else {
      this.loadData();
    }
  }

  allday(): void {
    console.log('Checkbox is checked. Running allday function...');
    // Add your allday function logic here
  }

  today(): void {
    console.log('Checkbox is unchecked. Running today function...');
    // Add your today function logic here
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
