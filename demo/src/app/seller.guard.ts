import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    if (localStorage.getItem('sellerToken')) {

      return true;
    }

    else {

      this.router.navigateByUrl('/auth')
      return false;

    }
  }

}

@Injectable({
  providedIn: 'root'
})
export class SellerProfileGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    if (localStorage.getItem('sellerToken')) {

      this.router.navigateByUrl('profile');
      return false;
    }

    else {

      return true;

    }
  }

}
