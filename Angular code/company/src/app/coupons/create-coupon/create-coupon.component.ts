import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Coupon} from './../../../common/Coupon'
import {WebApiClientService} from './../../services/web-api-client.service';

@Component({
  selector: 'app-create-coupon',
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent implements OnInit {

  constructor(private _WebApiClientService:WebApiClientService) {}

  @Output('do') couponCreated = new EventEmitter();

  coupons: Coupon[] = new Array<Coupon>();

   tmpCoup:Coupon = new Coupon(null,null,null,null,null,null,'',null,'');
  
  
   //Sending coupon to Angular Service and that sending ajax request for create coupon
   createCoupon(){
    let today = new Date();
    this.tmpCoup.start_Date=today;
   this._WebApiClientService.ajaxCreateCoupon(this.tmpCoup);

    
   }


  ngOnInit() {
  }
  

}
