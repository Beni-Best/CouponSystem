import { Component, OnInit } from '@angular/core';
import {WebApiClientService} from './../services/web-api-client.service';
import {Coupon} from './../common/coupon';
@Component({
  selector: 'app-my-coupons',
  templateUrl: './my-coupons.component.html',
  styleUrls: ['./my-coupons.component.css']
})
export class MyCouponsComponent implements OnInit {
  coupons:Coupon[]= new Array<Coupon>();

  //get all purchased coupons 
  constructor(private _WebApiClientService:WebApiClientService) { 
    this._WebApiClientService.ajaxGetMyPurchasedCoupons();
    this.coupons=this._WebApiClientService.myCoupons;
  }

  ngOnInit() {
  }

}
