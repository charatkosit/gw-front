import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { render } from '@fullcalendar/core/preact';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MemberProfile } from 'src/app/interfaces/globalData';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerTableService } from 'src/app/services/customer-table.service';
import { OrderTableService } from 'src/app/services/order-table.service';
import { ShareService } from 'src/app/services/share.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  
  memberProfile$: Observable<MemberProfile>;
  memberId!: string;

  customerForm!: FormGroup;
  constructor(
    private auth: AuthService,
    private customer: CustomerTableService,
    private modalService: NgbModal,
    private order: OrderTableService,
    private router: Router,
    private share: ShareService
  ) { 
    this.memberProfile$ = this.auth.memberProfile$;
  }

  data: any[] = [];
  customerId!:number;
  showOrderCreateModal = false;
  showCustomerCreateModal = false;
  showCustomerProfileModal = false;
  showCustomerEditModal = false;
  showModal = false;

  modalCreateOrderData: any;
  modalEditData: any;
  modalData: any;



  ngOnInit(): void {
    this.auth.memberProfile$.subscribe(
      data =>{
        this.memberId = data.memberId;
        this.loadData();
        this.initializeDataTable();
      }
    )
   

  }

  initializeDataTable() {
    $(document).ready(() => {
      var table = $('#example1').DataTable({
        info: false,

        language: {
          lengthMenu: 'แสดง _MENU_ แถว',
          zeroRecords: 'ไม่พบข้อมูล',
          // info: 'แสดง _START_ ถึง _END_ จาก _TOTAL_ แถว',

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
        scrollX: false, // Disable horizontal scroll
        autoWidth: false, // Disable automatic column width calculation
        lengthChange: false, // ไม่แสดงช่องเลือก แสดงแถว 10,25,50,100
        pageLength: 15, //   แสดง 15 แถวตายตัว
        data: this.data,
        // order: [[6, 'desc']], // เรียงลำดับตามเวลาเข้า
        columns: [
          { data: 'id', title: 'id', className: "text-center" },
          { data: 'name', title: 'ชื่อ', className: "text-center" },
          { data: 'phone', title: 'โทรศัพท์', className: "text-center" },
          { data: 'address', title: 'ที่อยู่', className: "text-center" },
          // {
          //   data: 'countOrder',
          //   title: 'จน.ใบงาน',
          //   className: "text-center",
          //   render: function (data: any, type: any, row: any) {
          //     return `<button class="btn btn-primary-outline btn-xs btn-profileCustomer" data-id="${row.id}">${data}</button>`;
          //   }
          // },
          { data: 'countCar', title: 'จน.รถ', className: 'text-center' },
          {
            title: 'จัดการ',
            className: 'text-center',
            data: null,
            render: function (data: any, type: any, row: any) {
              console.log(`row is ${JSON.stringify(row.id)}`);
              return ` <button class="btn btn-sm btn-warning btn-profileCustomer" data-id="${row.id}">ประวัติ</button>
                        <button class="btn btn-sm btn-success btn-createOrder" data-id="${row.id}">รับงาน</button>
                        <button class="btn btn-sm btn-primary btn-editCustomer" data-id="${row.id}">แก้ไข</button>
                        <button class="btn btn-sm btn-danger btn-deleteCustomer" data-id="${row.id}">ลบ</button>`;

            }
          },
        ]
      });
      $(document).on('click', '.btn-createOrder', (event: any) => {
        var customerId = $(event.target).data('id');
        console.log(`when addCar click: ${customerId}`);
        this.onShowOrderCreate(customerId);
      });
      $(document).on('click', '.btn-profileCustomer', (event: any) => {
        var customerId = $(event.target).data('id');
        console.log(`when profileCustomer click: ${customerId}`);
        // this.onShowCustomerProfile(customerId);
        //ส่งค่าไปให้ orderDetail-list ผ่าน shareService
        this.share.customerId = customerId;
        this.router.navigate(['/garage/customer-profile'])

      });
      $(document).on('click', '.btn-editCustomer', (event: any) => {
        var customerId = $(event.target).data('id');
        console.log(`when editCustomer click: ${customerId}`);
        this.onShowEditCustomer(customerId);
      });
      $(document).on('click', '.btn-deleteCustomer', (event: any) => {
        var customerId = $(event.target).data('id');
        console.log(`when delete click: ${customerId}`);
        this.onDeleteCustomerAlert(customerId);
      });
    });
  }


  private loadData(): void {
    this.customer.findAll(this.memberId).subscribe(data => {
      this.data = data;
      console.log(`data customer is ${JSON.stringify(this.data)}`);
      const table = $('#example1').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();

    });
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
    this.customer.findAll(this.memberId).subscribe(data => {
      this.data = data;
      var table = $('#example1').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();
    });
  }
  //-----------ก่อนไปยัง modal--------------------
  onDeleteCustomerAlert(customerId: number) {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'me-2 btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'ต้องการลบ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ใช่ ลบ',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.customer.delete(customerId).subscribe({
          next: response => {
            console.log('Car deleted successfully', response);
            swalWithBootstrapButtons.fire('รายการถูกลบแล้ว',)
            this.reloadDataTable();
          },
          error: error => {
            console.error('Error deleting car', error);
            swalWithBootstrapButtons.fire('ไม่สามารถ ลบได้', 'มีการใช้รายการนี้ ในการรับงาน')
          }
        });

      }
    })
  }

  onShowOrderCreate(customerId: number) {
    this.customer.findById(customerId, this.memberId).subscribe({
      next: (data) => {
        this.modalCreateOrderData = data;
        this.showOrderCreateModal = true;
        console.log(`modalEditData is ${JSON.stringify(data)}`);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onShowCustomerProfile(customerId: number) {

    this.order.findByCustomerId(customerId, this.memberId).subscribe({
      next: (data) => {
        this.modalData = data;
        this.showCustomerProfileModal = true;
        console.log(`modalData is ${JSON.stringify(data)}`);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onShowEditCustomer(customerId: number) {
    this.customer.findById(customerId, this.memberId).subscribe({
      next: (data) => {
        this.modalEditData = data;
        this.showCustomerEditModal = true;
        console.log(`modalEditData is ${JSON.stringify(data)}`);
      },
      error: (error) => {
        console.log(error);
      }
    });

  }

  onCreateCustomer() {
    this.showCustomerCreateModal = true;
  }
  //-------------------------------
  // modal ทำการเรียกข้อมูลใหม่อีกครั้ง
  getData(customerId: number) {
    this.order.findByCustomerId(customerId, this.memberId).subscribe({
      next: (data) => {
        this.modalData = data;
        this.showCustomerProfileModal = true;
        console.log(`modalData is ${JSON.stringify(data)}`);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



  //---กลับมาจาก modal-----------------

  onSubmitCreate(customerForm: FormGroup) {
    console.log(`data customerForm: ${JSON.stringify(customerForm.value)}`)
    const customerData = {
      name: customerForm.value.name,
      phone: customerForm.value.phone,
      address: customerForm.value.address,
      memberId: this.memberId
    };
    this.customer.create(customerData).subscribe({
      next: response => {
        console.log('Customer created successfully', response);
        this.reloadDataTable();
        // Close the modal
        this.modalService.dismissAll();
      },
      error: error => {
        console.error('Error creating customer', error);
      }
    });
  }

  onSubmitEdit(customerForm: FormGroup) {
    const customerEditData = {
      name: customerForm.value.name,
      address: customerForm.value.address,
      phone: customerForm.value.phone,

    }
    console.log(`data customerForm is ${JSON.stringify(customerEditData)}`);
    this.customer.update(customerForm.value.customerId, customerEditData).subscribe({
      next: response => {
        console.log('Customer updated successfully', response);
        this.reloadDataTable();
        this.showCustomerEditModal = false;
      },
      error: error => {
        console.error('Error updating customer', error);
      }
    });
  }



  closeModal() {
    this.showCustomerProfileModal = false;
  }

  closeCustomerEditModal() {
    this.showCustomerEditModal = false;
  }

  closeCustomerCreateModal() {
    this.showCustomerCreateModal = false;
  }

  closeOrderCreateModal() {
    this.showOrderCreateModal = false;
  }



}
