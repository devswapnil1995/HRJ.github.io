import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import axios from 'axios';
import { environment } from 'src/environments/environment';

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
  private apiKey = 'pubkey-a884a30216e9063b12edaf7c95b91eba';
  private domain = 'sandbox0b9ddb75de764fe9ab0bded8bc1df53c';
  sendMail_1(tempDetails): Observable<any> {
    formData.append('from', 'swapnilbhoir1029@gmail.com')
    formData.append('to', 'swapnilbhoir1029@gmail.com');
    formData.append('subject', 'Enquiry');
    formData.append('text', tempDetails);
        
    return this.http
      .post(
        'https://api.mailgun.net/v3/sandbox0b9ddb75de764fe9ab0bded8bc1df53c.mailgun.org',
        formData, 
        { headers }
      );
  }

  sendEmail() {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(environment.sendGridApiKey);

    const msg = {
      to: "swapnilbadbhr@gmail.com",
      from: "swapnilbhoir1029@gmail.com",
      subject: "test subject",
      text: "test body",
      html: "test body"
    };

    return sgMail.send(msg);
  }
}
