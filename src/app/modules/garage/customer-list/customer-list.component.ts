import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerTableService } from 'src/app/services/customer-table.service';
import { OrderTableService } from 'src/app/services/order-table.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  customerForm!: FormGroup;
  constructor(
    private customer: CustomerTableService,
    private modalService: NgbModal,
    private order: OrderTableService,
  ) { }

  data: any[] = [];
  showCustomerProfileModal = false;
  showModal = false;
  modalData: any;
  memberId = 'A-004';


  ngOnInit(): void {
    this.loadData();
    this.initializeDataTable();

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
        data: this.data,
        // order: [[6, 'desc']], // เรียงลำดับตามเวลาเข้า
        columns: [
          { data: 'id', title: 'id', className: "text-center" },
          { data: 'name', title: 'ชื่อ', className: "text-center" },
          { data: 'phone', title: 'โทรศัพท์', className: "text-center" },
          { data: 'address', title: 'ที่อยู่', className: "text-center" },
          {
            title: 'สถานะ',
            className: 'text-center',
            data: null,
            render: function (data: any, type: any, row: any) {
              console.log(`row is ${JSON.stringify(row.id)}`);
                return `<button class="btn btn-warning btn-profileCustomer" data-id="${row.id}">ประวัติ</button>
                        <button class="btn btn-primary btn-editCustomer" data-id="${row.id}">แก้ไข</button>
                        <button class="btn btn-danger btn-deleteCustomer" data-id="${row.id}">ลบ</button>`;

            }
          },
        ]
      });
      $(document).on('click', '.btn-profileCustomer', (event: any) => {
        var customerId = $(event.target).data('id');
        console.log(`when profileCustomer click: ${customerId}`);
        this.onShowCustomerProfile(customerId);
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
  //-------------------------------
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

  //-------------------------------

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
  }

  closeModal() {
    this.showCustomerProfileModal = false;
  }


  getCustomerList(memberId: string) {
    this.customer.findAll(memberId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getCustomerById(id: number, memberId: string) {
    this.customer.findById(id, memberId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateCustomer(id: number, customerData: any) {
    this.customer.update(id, customerData).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  deleteCustomer(id: number) {
    this.customer.delete(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

}
