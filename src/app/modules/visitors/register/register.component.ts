import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    firstName: '',
    lastName: '',
    phone:'',
    idCard: '',
    token: '',
    destFloor: ''
    
  };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // ทำการส่งข้อมูล
    const url ='/api/visitors'
    this.http.post(url, this.user).subscribe(
      response => {
        console.log(response);
        this.resetForm();
      },
      error => {
        console.error(error);
      }
    );
  }

  resetForm() {
    this.user = {
      firstName: '',
      lastName: '',
      phone:'',
      idCard: '',
      token: '',
      destFloor:''
    };
  }

}
