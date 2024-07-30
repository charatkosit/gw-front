import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-car-create-modal',
  templateUrl: './car-create-modal.component.html',
  styleUrls: ['./car-create-modal.component.css']
})
export class CarCreateModalComponent {
  @Input()   showCarCreateModal = false;
  @Output()  close = new EventEmitter<void>();

  @Output()  formSubmitted = new EventEmitter<FormGroup>();


  carForm!: FormGroup;
  brands: string[]=[];

  constructor(
    private fb: FormBuilder,
    private brand:BrandService
  ) {
    this.carForm = this.fb.group({
      model: ['', Validators.required],
      brand: ['', Validators.required],
      year: [''],
      color: [''],
      licensePlate: ['', Validators.required],
    })
  }

  closeModal(){
     this.showCarCreateModal = false;
     this.close.emit();
  }

  ngOnInit(){
    this.brand.getBrand().subscribe((data:string[])=>{
      this.brands = data
    })
  }

  submitCreate() {
    const data = this.carForm.value;
    console.log(`data carForm is ${JSON.stringify(data)}`);
    if (this.carForm.valid) {
      this.closeModal();
      console.log(`data carForm is valid ${JSON.stringify(data)}`);
      this.onRefreshData();

    }
    
  }

  onRefreshData(){
    // this.closeModal();
    this.formSubmitted.emit(this.carForm)
   
  }
}
