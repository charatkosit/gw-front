import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarTableService } from 'src/app/services/car-table.service';
declare var $: any;

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent {

  carForm!: FormGroup;
  constructor(
    private car: CarTableService,
    private modalService: NgbModal,
    private fb: FormBuilder,
  ) {
    this.carForm = this.fb.group({
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: [''],
      color: [''],
      licensePlate: ['', Validators.required],
    })
  }
  data: any[] = [];
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
          { data: 'licensePlate', title: 'ทะเบียน', className: "text-center" },
          {
            title: 'สถานะ',
            className: 'text-center',
            data: null,
            render: function (data: any, type: any, row: any) {
              console.log(`row is ${JSON.stringify(row.token)}`);
              if (row.checkOut == null) {
                return '<button class="btn btn-warning btn-returnCard" data-token="' + row.token + '">เลือก</button>';
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
  }


  private loadData(): void {
    this.car.findAll(this.memberId).subscribe(data => {
      this.data = data;
      console.log(`data is ${JSON.stringify(this.data)}`);
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
    this.car.findAll(this.memberId).subscribe(data => {
      this.data = data;
      var table = $('#example1').DataTable();
      table.clear();
      table.rows.add(this.data);
      table.draw();
    });
  }
  //-------------------------------

  onSubmit() {
    const data = this.carForm.value;
    console.log(`data carForm: ${JSON.stringify(data)}`)
    if (this.carForm.valid) {

      const data = this.carForm.value;
      console.log(`data carForm: ${JSON.stringify(data)}`)

      const carData = {
        model: this.carForm.get('model')?.value,
        brand: this.carForm.get('brand')?.value,
        year: this.carForm.get('year')?.value,
        color: this.carForm.get('color')?.value,
        licensePlate: this.carForm.get('licensePlate')?.value,
        memberId: this.memberId
      };

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


  }


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


  deleteCar(id: number) {
    this.car.delete(id).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
