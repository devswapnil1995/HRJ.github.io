import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
const headers = new HttpHeaders({
  // 'enctype': 'multipart/form-data',
  'Authorization': `Basic ${btoa('api:37db0fb8c56690e3d0b8fa29dc241554-db4df449-3e827f78')}`
});

const formData = new FormData();
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http:HttpClient) { }

  sendMail(tempDetails): Observable<any> {
    formData.append('from', 'swapnilbhoir1029@gmail.com')
    formData.append('to', 'swapnilbhoir1029@gmail.com');
    formData.append('subject', 'Enquiry');
    formData.append('text', tempDetails);
        
    return this.http
      .post(
        'https://api.mailgun.net/v3/sandbox0b9ddb75de764fe9ab0bded8bc1df53c.mailgun.org/messages',
        formData, 
        { headers }
      );
  }
}
