import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  user = {
    firstName: '',
    lastName: '',
    phone:'',
    idCard: '',
    token: '',
    destFloor: ''
    
  };
  ngOnInit(): void {
  }


  onSubmit(){

  }

  resetForm(){
    
  }
}
