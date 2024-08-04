import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Observable, switchMap } from 'rxjs';
import { MemberProfile } from 'src/app/interfaces/globalData';
import { AuthService } from 'src/app/services/auth.service';
import { CarTableService } from 'src/app/services/car-table.service';
import { CustomerTableService } from 'src/app/services/customer-table.service';
import { OrderTableService } from 'src/app/services/order-table.service';
import { ShareService } from 'src/app/services/share.service';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-pickup-car',
  templateUrl: './pickup-car.component.html',
  styleUrls: ['./pickup-car.component.css']
})
export class PickupCarComponent implements OnInit {

  data: any[] = [];
  searchForm!: FormGroup;
  customerData: any[] = [];
  carData:any[] = [];
  modalCustomerCreateOrderData: any;
  modalCarCreateOrderData: any;

  showOrderCreateModal= false;          //สำหรับ เปิด modal  สร้าง Order แบบกรอกทุกอย่าง
  showCustomerOrderCreateModal= false;  //สำหรับ เปิด modal  สร้าง Order แบบ รู้ customer 
  showCarOrderCreateModal= false;       //สำหรับ เปิด modal  สร้าง Order แบบ รู้ car

  orderForm: FormGroup;
  memberProfile$: Observable<MemberProfile>;
  memberId!: string;


  constructor(
    private auth: AuthService,
    private customer: CustomerTableService,
    private car: CarTableService,
    // private modalService: NgbModal,
    private order: OrderTableService,
    private fb: FormBuilder,
    private router: Router,
    private share: ShareService
  ) {
    this.memberProfile$ = this.auth.memberProfile$; 
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
      km: [''],
      status:['']
    })
  }

  ngOnInit(): void {
    this.memberProfile$.subscribe(
      data => {
        this.memberId = data.memberId;
      }
    )
    console.log()
    this.searchForm = this.fb.group({
      searchTerm: ['', Validators.maxLength(30)],
    });

    let searchTermControl = this.searchForm.get('searchTerm');
    if (searchTermControl) {
      searchTermControl.valueChanges.pipe(
        debounceTime(300), // รอ 300 มิลลิวินาทีก่อนเรียก API
        switchMap(value => {
          return this.customer.singleSearch(this.memberId, value)
        })
      ).subscribe((data) => {
        console.log(`res: ${JSON.stringify(data)}`)
        const total = data.resultFound;
        this.customerData = data.data.customer;

        this.carData = data.data.car;

        console.log(`total is ${total}`)
        console.log(`customerData[] is ${JSON.stringify(this.customerData)}`)
      }
      )


    }

  }

  loadData() {
    this.customer.singleSearch(this.memberId, 'ชรัตน์').subscribe({
      next: data => {
        const total = data.resultFound;
        this.customerData = data.data.customer;
        console.log(`total is ${total}`)
        console.log(`customerData[] is ${JSON.stringify(this.customerData[0].name)}`)
      },
      error: error => {
        console.log(`error: ${JSON.stringify(error)}`)
      }
    })
  }


//----------------ก่อนไป modal--------------------
  orderCreate(){
  this.showOrderCreateModal = true;
  }

  orderByCarId(carId: number) {
    this.car.findById(carId, this.memberId).subscribe({
      next: (data) => {
        this.modalCarCreateOrderData = data;
        this.showCarOrderCreateModal = true;
        console.log(`modalData is ${JSON.stringify(data)}`);
      },
      error: (error) => {
        console.log(`${JSON.stringify(error)}`);
      }
    });

  }

  orderByCustomerId(customerId: number) {
    this.customer.findById(customerId, this.memberId).subscribe({
      next: (data) => {
        this.modalCustomerCreateOrderData = data;
        this.showCustomerOrderCreateModal = true;
        console.log(`modalEditData is ${JSON.stringify(data)}`);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  //---------------กลับมาจาก modal----------------

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
        km: orderForm.value.km,
        status: orderForm.value.status
      }

    };

    console.log(`orderData1: ${JSON.stringify(orderData)}`);
    this.order.create(this.memberId, orderData).subscribe({
      next: response => {
        console.log('order created successfully', response);
        // this.reloadDataTable();
      },
      error: error => {
        console.error('Error creating order', error);
      }
    });
  }

  closeCustomerOrderCreateModal() {
    this.showCustomerOrderCreateModal = false;
  }
  closeCarOrderCreateModal() {
    this.showCarOrderCreateModal = false;
  }
}
