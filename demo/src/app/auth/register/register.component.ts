import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  isValid: boolean = false;
  status = true;

  recaptcha = '6LdPS2wnAAAAAJoZSByaz4MFJb8Y1x5vWPhpSJGW';

  registerGroup = this.fb.group({

    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    companyName: ['', Validators.required],
    captcha: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private service: HttpService, private router: Router, private tostr: HotToastService) {
  }

  sendForm(formData: any) {

    console.log(formData);
    

    this.isValid = true;
    this.status = false
    this.service.post(`/auth/register`, formData).subscribe({
      next: (data) => {
        console.log(data);

        this.tostr.success('Register successfully');
        this.router.navigateByUrl('/auth/login');
      }
    })

  }

}