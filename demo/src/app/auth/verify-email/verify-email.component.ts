import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  token: any;

  constructor(private routeData: ActivatedRoute, private http: HttpService, private route: Router) {


  }

  ngOnInit(): void {

    this.token = this.routeData.snapshot.queryParams['token']

  }

  verifyAccount() {

    this.http.post(`/auth/verify-email?token=${this.token}`, {}).subscribe((data) => this.route.navigateByUrl('profile'))

  }

}
