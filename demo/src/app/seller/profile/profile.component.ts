import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  accountStatus: any;
  userData: any;

  constructor(private http: HttpService, private route: Router, private tostr: HotToastService) { }

  ngOnInit(): void {

    this.getProfile();
  }

  getProfile() {

    this.http.get('/user/profile').subscribe((data: any) => {

      this.accountStatus = data['user']['isEmailVerfified'];
      this.userData = data['user'];
    })

  }

  verifyEmail() {

    this.http.post('/auth/send-verification-email', {}).subscribe((data: any) => {

      this.tostr.success('Verification link send to the ethereal mail')
      this.getProfile();

    });

  }

  logout() {

    localStorage.removeItem('sellerToken');
    this.route.navigateByUrl('/seller/auth/login');

  }

}