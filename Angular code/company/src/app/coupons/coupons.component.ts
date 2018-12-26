import { Component, OnInit } from '@angular/core';
import { Coupon } from 'src/common/Coupon';
import {WebApiClientService} from './../services/web-api-client.service'

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  coupons: Coupon[] = new Array<Coupon>();


  constructor(private _WebApiClientService:WebApiClientService) {
    this._WebApiClientService.ajaxGetAllCoupons();
    this.coupons=this._WebApiClientService.coupons;
   }
  
   //Request to get all coupons 
   refreshCoupons(){
    this._WebApiClientService.ajaxGetAllCoupons();
   }

   //request to use logout
   logout(){
    this._WebApiClientService.ajaxLogout();
   }


  ngOnInit() {
    
  }
  

}
