import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficerService {

  private apiUrl = '/api/officers/'

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
  }

  getCount(): Observable<any> {
    return this.http.get<any>('/api/officers/count')
  }

  delete(id: number) {
    // กำหนด URL ที่คุณต้องการส่งคำขอ DELETE
    const url = 'api/officers/' + id;

    // สร้างคำขอ DELETE ไปยัง URL
    fetch(url, {
      method: 'DELETE',
    })
      .then(response => response.json()) // แปลงคำตอบเป็น JSON
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
}
