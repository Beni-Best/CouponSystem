import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Coupon} from './../../../common/Coupon';
import {WebApiClientService} from './../../services/web-api-client.service'

@Component({
  selector: 'app-update-coupon',
  templateUrl: './update-coupon.component.html',
  styleUrls: ['./update-coupon.component.css']
})
export class UpdateCouponComponent implements OnInit {
  // @Output('do') couponCreated = new EventEmitter();
  constructor(private _webService:WebApiClientService) { }

  coupon:Coupon = new Coupon;

  ngOnInit() {
  }

  //Update coupon , If string=='price' it will update coupon price. If string =='date' it will update coupon end date
  updateCoupon(data:string){
    if(data==='price'){
      this._webService.ajaxUpdateCouponPrice(this.coupon.price,this.coupon.id);
    }else if(data==='date'){
      this._webService.ajaxUpdateCouponEndDate(this.coupon.end_Date,this.coupon.id);
    }
    // setTimeout(() => {
    //   this.couponCreated.emit()
    // }, 1000);
  }


}
