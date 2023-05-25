import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app.service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  bannerOptions: OwlOptions = {
    autoplay: true,
    //autoplayTimeout:600,
    autoplayHoverPause: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
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
    nav: true,
    lazyLoad: true,
    lazyLoadEager:10
  };

  customOptions: OwlOptions = {
    loop: true,
    lazyLoad: true,
    mouseDrag: true,
    touchDrag: true,
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
    lazyLoadEager:10
  };
  constructor(private ser: AppServiceService, public dialog: MatDialog) { }


  ngOnInit() {

  }

  submitForm() {
    try {
      this.displayProgressSpinner = true;
      let tempDetails: string = "";
      tempDetails += "Name:" + this.formData.name + "\n";
      tempDetails += "Company:" + this.formData.company + "\n";
      tempDetails += "Telephone:" + this.formData.telephone + "\n";
      tempDetails += "Message:" + this.formData.message + "\n";
      tempDetails += "Email:" + this.formData.email + "\n";
      this.ser.sendMail(tempDetails).subscribe((res) => {
        this.displayProgressSpinner = false;
        this.dialog.open(DialogAnimationsExampleDialog, {
          delayFocusTrap: true
        });
        setTimeout(() => {
          this.dialog.closeAll();
          this.formData = {
            name: '',
            company: '',
            telephone: '',
            email: '',
            message: ''
          };
        }, 3000)
      })
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
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }
}