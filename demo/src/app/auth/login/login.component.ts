import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  recaptcha: any = '6LdPS2wnAAAAAJoZSByaz4MFJb8Y1x5vWPhpSJGW';
  forgotData: any = '';

  loginForm = this.fb.group({

    email: [''],
    password: [''],
    captcha: ['']
  })

  constructor(private fb: FormBuilder, private service: HttpService, private route: Router) { }

  sendForm(data: any) {

    console.log(data);

    // this.service.post(`/auth/login`, data).subscribe({
    //   next: (data:any) => {

    //     console.log(data);
        
    //     localStorage.setItem('sellerToken',data['userToken'])
    //     this.route.navigateByUrl('profile');
    //   }
    // })

  }

  resolved(event: any) {

    console.log(event);

  }

  send() {

    console.log(this.forgotData);
    this.service.post('/auth/forgot-password', {email:this.forgotData}).subscribe((data) => {

      console.log(data);

    })
  }

}
