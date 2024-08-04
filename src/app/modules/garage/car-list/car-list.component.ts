import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MemberProfile } from 'src/app/interfaces/globalData';
import { AuthService } from 'src/app/services/auth.service';
import { CarTableService } from 'src/app/services/car-table.service';
import { OrderTableService } from 'src/app/services/order-table.service';
import { ShareService } from 'src/app/services/share.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent {

  memberProfile$: Observable<MemberProfile>;
  memberId!: string; 

  constructor(
    private auth: AuthService,
    private car: CarTableService,
    private order: OrderTableService,
    private share: ShareService,
    private modalService: NgbModal,
    private route: Router,
  ) { 
    this.memberProfile$ = this.auth.memberProfile$;
  }

  data: any[] = [];
  showCarEditModal = false;
  showCarProfileModal = false;
  showCarCreateModal = false;
  showOrderCreateModal = false;
  showModal = false;
  modalData: any;
  modalEditData: any;
  modalCreateOrderData: any;



  ngOnInit(): void {
    this.auth.memberProfile$.subscribe(
      data => {
        this.memberId = data.memberId;
        this.loadData();
        this.initializeDataTable();
      }
    )
   
    

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
        info: false,
        stateSave: true,
        scrollX: false, // Disable horizontal scroll
        autoWidth: false, // Disable automatic column width calculation
        lengthChange: false, // ไม่แสดงช่องเลือก แสดงแถว 10,25,50,100
        pageLength: 15, //   แสดง 15 แถวตายตัว
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
            data: 'countOrder',
            title: 'ใบงาน',
            className: "text-center",
            render: function (data: any, type: any, row: any) {
              if (row.countOrder > 0) {
                return `<span class="right badge badge-warning badge-click" data-id="${row.id}">${row.countOrder}</span>`;
              } else {
                return `${data}`;
              }

            }
          },
          {
            title: 'จัดการ',
            className: 'text-center',
            data: null,
            render: function (data: any, type: any, row: any) {
              // console.log(`row is ${JSON.stringify(row.id)}`);
              return `<button class="btn btn-warning btn-sm btn-select" data-id="${row.id}">เลือก</button>
                      <button class="btn btn-success btn-sm btn-createOrder" data-id="${row.id}">รับงาน</button>
                      <button class="btn btn-primary btn-sm btn-editCar" data-id="${row.id}">แก้ไข</button>
                      <button class="btn btn-danger  btn-sm btn-deleteCar" data-id="${row.id}">ลบ</button>`
            }
          },
        ]
      });
      $(document).on('click', '.btn-select', (event: any) => {
        var selectedCarId = $(event.target).data('id');
        console.log(`btn-select clicked: ${selectedCarId}`);
        this.selectCarProfile(selectedCarId); // Call the desired function with carId
      });

      $(document).on('click', '.btn-createOrder', (event: any) => {
        var carId = $(event.target).data('id');
        console.log(`btn-createOrder clicked: ${carId}`);
        this.onShowOrderCreate(carId); // Call the desired function with carId
      });

      $(document).on('click', '.badge-click', (event: any) => {
        var carId = $(event.target).data('id');
        console.log(`Badge clicked: ${carId}`);
        this.onShowCarProfile(carId); // Call the desired function with carId
      });

      $(document).on('click', '.btn-profileCar', (event: any) => {
        var carId = $(event.target).data('id');
        console.log(`when profileCar click: ${carId}`);
        this.onShowCarProfile(carId);
      });
      $(document).on('click', '.btn-editCar', (event: any) => {
        var carId = $(event.target).data('id');
        console.log(`when editCar click: ${carId}`);
        this.onShowEditCar(carId);
      });
      $(document).on('click', '.btn-deleteCar', (event: any) => {
        var carId = $(event.target).data('id');
        console.log(`when delete click: ${carId}`);
        this.onDeleteCarAlert(carId);
      });

    });
  }


  private loadData(): void {
    // load Car data
    this.car.findAll(this.memberId).subscribe(data => {
      this.data = data;
      console.log(`data is ${JSON.stringify(this.data)}`);
      const table = $('#example1').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();
    });

    // แต่ละคัน มีประวัติในการรับงาน เท่าไร
    // นำ carId ไปหาจำนวน  ที่order มี carId นี้
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
    this.car.findAll(this.memberId).subscribe(data => {
      this.data = data;
      var table = $('#example1').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();
    });
  }
  //-------------------------------

  onDeleteCarAlert(carId: number) {

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
        this.car.delete(carId).subscribe({
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
  selectCarProfile(selectedCarId: number) {
    this.car.findById(selectedCarId, this.memberId).subscribe(
      data => {
        console.log(`car,customer: ${JSON.stringify(data)}`)
        console.log(`car:${selectedCarId},customer: ${JSON.stringify(data.customers[0].id)}`)

        let objData = {
          customerId: data.customers[0].id,
          carId: selectedCarId
        }
        this.share.updateGlobalData(objData)
      }
    )
    let objData = {
      customerId: 0,
      carId: selectedCarId
    }
    this.share.updateGlobalData(objData)
  }

  //---------------ก่อนไป modal----------------
  onShowOrderCreate(carId: number) {
    this.car.findById(carId, this.memberId).subscribe({
      next: (data) => {
        this.modalCreateOrderData = data;
        this.showOrderCreateModal = true;
        console.log(`modalData is ${JSON.stringify(data)}`);
      },
      error: (error) => {
        console.log(`${JSON.stringify(error)}`);
      }
    });


  }

  onShowCarProfile(carId: number) {
    this.showCarProfileModal = true
    this.order.findByCarId(carId, this.memberId).subscribe({
      next: (data) => {
        console.log(`data is ${JSON.stringify(data)}`);
        this.modalData = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // modal ทำการเรียกข้อมูลใหม่อีกครั้ง
  getData(carId: number) {
    this.showCarProfileModal = true
    this.order.findByCarId(carId, this.memberId).subscribe({
      next: (data) => {
        console.log(`data is ${JSON.stringify(data)}`);
        this.modalData = data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }



  onShowEditCar(carId: number) {

    console.log(`@onEditCar sent showCarEditModal: ${this.showCarEditModal}`);
    this.car.findById(carId, this.memberId).subscribe({
      next: (data) => {
        console.log(`data @onEditCar is ${JSON.stringify(data)}`);
        this.modalEditData = data;
        this.showCarEditModal = true;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onTimeline(carId: number) {
    console.log(`@Timeline carId: ${carId}`);
    this.route.navigate(['/garage/timeline']);
  }

  onCreateCar() {
    this.showCarCreateModal = true;
  }
  //------------กลับมาจาก modal------------------------
  onSubmitCreate(carForm: FormGroup) {

    console.log(`data carForm: ${JSON.stringify(carForm.value)}`);
    const carData = {
      model: carForm.value.model,
      brand: carForm.value.brand,
      year: carForm.value.year,
      color: carForm.value.color,
      licensePlate: carForm.value.licensePlate,
      memberId: this.memberId
    };
    console.log(`carData1: ${JSON.stringify(carData)}`);
    this.car.create(carData).subscribe({
      next: response => {
        console.log('Car created successfully', response);
        this.reloadDataTable();
        this.showCarCreateModal = false;
        // Close the modal
        // this.modalService.dismissAll();
      },
      error: error => {
        console.error('Error creating car', error);
      }
    });
  }

  onEditSubmit(carForm: FormGroup) {
    const carEditData = {
      model: carForm.value.model,
      brand: carForm.value.brand,
      year: carForm.value.year,
      color: carForm.value.color,
      licensePlate: carForm.value.licensePlate
    }
    console.log(`data carForm is ${JSON.stringify(carEditData)}`);
    this.car.update(carForm.value.carId, carEditData).subscribe({
      next: response => {
        console.log('Car updated successfully', response);
        this.reloadDataTable();
        this.showCarEditModal = false;
      },
      error: error => {
        console.error('Error updating car', error);
      }
    });

  }


  closeCarEditModal() {
    this.showCarEditModal = false;
  }
  closeModal() {
    this.showCarProfileModal = false;
  }
  closeCreateModal() {
    this.showCarCreateModal = false;
  }

  closeOrderCreateModal() {
    this.showOrderCreateModal = false;
  }

}
