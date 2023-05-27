import { Component, Inject, OnInit } from '@angular/core';
import { AppServiceService } from './app.service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  SearchCountryField,
  CountryISO
} from "ngx-intl-tel-input";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'howardjones-renovations-ltd';
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;
  formData = {
    name: '',
    company: '',
    telephone: '',
    email: '',
    message: ''
  };
  ShowValidation: boolean = false;

  bannerOptions: OwlOptions = {
    autoplay: true,
    //autoplayTimeout:600,
    autoplayHoverPause: true,
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    margin: 24,
    navSpeed: 700,
    autoplay: true,
    //  autoplayTimeout: 3000,
    navText: [' < ', ' > '],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      1366: {
        items: 4,
      },
    },
    nav: true,
  };
  tempTel = {
    number: "",
    internationalNumber: "",
    nationalNumber: "",
    countryCode: "GB",
    dialCode: "+44"
  };

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Qatar];
  showNameValidation: boolean = false;
  showCompanyValidation: boolean = false;
  showTelephoneValidation: boolean = false;
  showEmailValidation: boolean = false;
  showEmailValidValidation: boolean = false;
  showMessageValidation: boolean = false;
  showCountryCodeValidation: boolean = false;
  isValid: boolean = false;

  constructor(private ser: AppServiceService, public dialog: MatDialog) { }


  ngOnInit() {

  }

  submitForm() {
    try {
      let tempDetails: string = "";
      this.showNameValidation = false;
      this.showCompanyValidation = false;
      this.showTelephoneValidation = false;
      this.showEmailValidation = false;
      this.showEmailValidValidation = false;
      this.showMessageValidation = false;
      this.showCountryCodeValidation= false;
      this.isValid = true;

      if (this.formData?.name?.trim() == "") {
        this.showNameValidation = true;
        this.isValid = false;
      }
      if (this.formData?.company?.trim() == "") {
        this.showCompanyValidation = true;
        this.isValid = false;
      }

      if (this.tempTel?.number?.toString()?.trim() == "" || this.tempTel?.number?.toString()?.trim() == undefined) {
        this.showTelephoneValidation = true;
        this.isValid = false;
      }
      
      if (this.tempTel?.countryCode?.toString()?.trim() == "" || this.tempTel?.countryCode?.toString()?.trim() == undefined) {
        this.showCountryCodeValidation = true;
        this.isValid = false;
      }

      if (this.formData?.message?.toString()?.trim() == "") {
        this.showMessageValidation = true;
        this.isValid = false;
      }
      if (this.formData.email.trim() == "") {
        this.showEmailValidation = true;
        this.isValid = false;
      }
      else if (!this.formData.email.trim().includes(".") || !this.formData.email.trim().includes("@")) {
        this.showEmailValidValidation = true;
        this.isValid = false;
      }

      if (this.isValid == false) {
        return;
      }

      //this.displayProgressSpinner = true;

      tempDetails += "Name:" + this.formData.name + "\n";
      tempDetails += "Company:" + this.formData.company + "\n";
      tempDetails += "Telephone:" + this.tempTel?.internationalNumber + "\n";
      tempDetails += "CountryCode:" + this.tempTel?.countryCode + "\n";
      tempDetails += "Message:" + this.formData.message + "\n";
      tempDetails += "Email:" + this.formData.email + "\n";
      this.ser.sendEmail()
      .then(() => {
        console.log('Email sent successfully.');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
      // this.ser.sendMail(tempDetails).subscribe((res) => {
      //   this.displayProgressSpinner = false;
      //   this.dialog.open(DialogAnimationsExampleDialog, {
      //     delayFocusTrap: true
      //   });
      //   setTimeout(() => {
      //     this.dialog.closeAll();
      //     this.formData = {
      //       name: '',
      //       company: '',
      //       telephone: '',
      //       email: '',
      //       message: ''
      //     };
      //   }, 3000)
      // },
      // (error)=>{
      //   this.displayProgressSpinner = false;
      // })
    } catch (ex) {
      this.displayProgressSpinner = false;
    }
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
<div mat-dialog-content>
  Thank you, we have received your email.
</div>`
})
export class DialogAnimationsExampleDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
  ) { }

  ngOnInit() {

  }
}