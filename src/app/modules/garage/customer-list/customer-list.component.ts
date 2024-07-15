import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerTableService } from 'src/app/services/customer-table.service';
declare var $: any;

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  customerForm!: FormGroup;
  constructor(private customer: CustomerTableService,
    private fb: FormBuilder,

  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['']
    })
  }

  data: any[] = [];
  memberId = 'A-004';


  ngOnInit(): void {
    this.loadData();

  }

  initializeDataTable() {}

  
  private loadData(): void {
    this.customer.findAll(this.memberId).subscribe(data => {
      this.data = data;
      console.log(`data customer is ${JSON.stringify(this.data)}`);

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
            { data: 'name', title: 'ชื่อ', className: "text-center" },
            { data: 'phone', title: 'โทรศัพท์', className: "text-center" },
            { data: 'address', title: 'ที่อยู่', className: "text-center" },
            {
              title: 'สถานะ',
              className: 'text-center',
              data: null,
              render: function (data: any, type: any, row: any) {
                console.log(`row is ${JSON.stringify(row.token)}`);
                if (row.checkOut == null) {
                  return '<button class="btn btn-warning btn-returnCard" data-token="' + row.token + '">รับงาน</button>';
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
    this.customer.findAll(this.memberId).subscribe(data => {
      this.data = data;
      var table = $('#example1').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();
    });
  }
  //-------------------------------


  onSubmit() {
    if (this.customerForm.valid) {

      const data = this.customerForm.value;
      console.log(`data customerForm: ${JSON.stringify(data)}`)

      const customerData = {
        name: this.customerForm.get('name')?.value,
        phone: this.customerForm.get('phone')?.value,
        address: this.customerForm.get('address')?.value,
        memberId: this.memberId
      };
      
      this.customer.create(customerData).subscribe({
        next: response => {
          console.log('Customer created successfully', response);
          this.reloadDataTable();
        },
        error: error => {
          console.error('Error creating customer', error);
        }
      });
    }


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
