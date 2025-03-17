import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private apiUrl = 'https://your-backend-api.com/complaints'; 

  constructor(private http: HttpClient) {}

  sendComplaint(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
