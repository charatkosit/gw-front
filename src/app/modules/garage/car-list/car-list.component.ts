import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarTableService } from 'src/app/services/car-table.service';
import { OrderTableService } from 'src/app/services/order-table.service';
import { SweetalertService } from 'src/app/services/sweetalert.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent {

  constructor(
    private car: CarTableService,
    private order: OrderTableService,
    private modalService: NgbModal,
    private route: Router,
  ) { }

  data: any[] = [];
  showCarEditModal = false; 
  showCarProfileModal = false;
  showModal = false;
  modalData: any;
  modalEditData: any;
  memberId = 'A-004';


  ngOnInit(): void {
    this.loadData();
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
        order: [[6, 'desc']], // เรียงลำดับตามเวลาเข้า
        columns: [
          { data: 'id', title: 'id', className: "text-center" },
          { data: 'model', title: 'รุ่น', className: "text-center" },
          { data: 'brand', title: 'แบรนด์', className: "text-center" },
          { data: 'year', title: 'ปี', className: "text-center" },
          { data: 'color', title: 'สี', className: "text-center" },
          {
            data: 'licensePlate',
            title: 'ทะเบียน',
            className: "text-center",
            render: function (data: any, type: any, row: any) {
              return `${data} <span class="right badge badge-success badge-click" data-id="${row.id}">2</span>`;
            }
          },
          {
            title: 'สถานะ',
            className: 'text-center',
            data: null,
            render: function (data: any, type: any, row: any) {
              console.log(`row is ${JSON.stringify(row.id)}`);
              return `<button class="btn btn-primary btn-editCar" data-id="${row.id}">แก้ไข</button>
                      <button class="btn btn-danger  btn-deleteCar" data-id="${row.id}">ลบ</button>`
             }
          },
        ]
      });
      $(document).on('click', '.badge-click', (event:any) => {
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
        this.onEditCar(carId);
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


  //---------------ก่อนไป modal----------------
  onShowCarProfile(carId: number) {
    this.showCarProfileModal  = true
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
  getData(carId: number){
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


  onEditCar(carId: number) {
    this.showCarEditModal = true;
    console.log(`@onEditCar sent showCarEditModal: ${this.showCarEditModal}`);
     this.car.findById(carId, this.memberId).subscribe({  
      next: (data) => {
        console.log(`data @onEditCar is ${JSON.stringify(data)}`);
        this.modalEditData = data;
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
        // Close the modal
        this.modalService.dismissAll();
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

  
  closeCarEditModal(){
    this.showCarEditModal = false;
    }
  closeModal() {
    this.showCarProfileModal = false;
  }
  //----------------ไม่ได้ใช้--------------------
  createCar() {
    const carData = {
      model: 'Model S',
      brand: 'Tesla',
      year: 2022,
      color: 'Red',
      licensePlate: 'ABC-1234',
      memberId: 'A-004'
    };

    this.car.create(carData).subscribe({
      next: response => {
        console.log('Car created successfully', response);
      },
      error: error => {
        console.error('Error creating car', error);
      }
    });
  }

  getCarList(memberId: string) {
    this.car.findAll(memberId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getCarById(id: number, memberId: string) {
    this.car.findById(id, memberId).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateCar(id: number, carData: any) {
    this.car.update(id, carData).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


}
