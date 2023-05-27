import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
const headers = new HttpHeaders({
  'enctype': 'multipart/form-data',
  'Authorization': `Basic ${btoa('api:865733b950bc4c83f4018da6cb3db443-07ec2ba2-8db4e8c1')}`
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
        'https://api.mailgun.net/v3/sandbox2dab66149841408ba3a032ec3073ac81.mailgun.org',
        formData, 
        { headers }
      );
  }
}
