import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  paramsToken: any;

  resetpasswordGroup = this.fb.group({

    newPassword: [''],
    confirmPassword: ['']
  })

  constructor(private fb: FormBuilder, private activeRouteData: ActivatedRoute, private service: HttpService, private route: Router) {


  }

  ngOnInit(): void {

    this.paramsToken = this.activeRouteData.snapshot.queryParams['token'];

  }

  sendForm(d: any) {

    this.service.post(`/auth/reset-password?token=${this.paramsToken}`, d).subscribe((data) => {

      console.log(data);
      this.route.navigateByUrl('/auth');

    })

  }

}
