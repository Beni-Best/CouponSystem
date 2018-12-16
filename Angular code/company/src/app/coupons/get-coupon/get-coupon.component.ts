import { Component, OnInit } from '@angular/core';
import {Coupon} from './../../../common/Coupon';
import {WebApiClientService} from './../../services/web-api-client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-coupon',
  templateUrl: './get-coupon.component.html',
  styleUrls: ['./get-coupon.component.css']
})
export class GetCouponComponent implements OnInit {
  
  constructor(private _webApi:WebApiClientService) { }
  coupons:Coupon[] = new Array<Coupon>();
  coupModel:Coupon = new Coupon;

  ngOnInit() {
  }

  getCouponById(){
    while(this.coupons.length>0){
    this.coupons.pop();
  }
    this._webApi.ajaxGetCouponById(this.coupModel.id).subscribe((resp)=>{
      this.coupons.push(resp.json())
    },(error)=>{
      Swal({
        type: 'error',
        title: 'Oops...',
        text: error._body,
      })
      console.log(error._body)
    })
  }

  getCouponByType(){
  console.log(this.coupModel.type)
    this._webApi.ajaxGetCouponByType(this.coupModel.type).subscribe((resp)=>{
      this.coupons=(resp.json())
      // this.coupons.push(resp.json()) WHY THIS NOT WORK?!
    },(error)=>{
      Swal({
        type: 'error',
        title: 'Oops...',
        text: error._body,
      })
      console.log(error._body)
    })
  }
  getCouponByPrice(){
    console.log(this.coupModel.price)
      this._webApi.ajaxGetCouponByPrice(this.coupModel.price).subscribe((resp)=>{
        this.coupons=(resp.json())
        // this.coupons.push(resp.json()) WHY THIS NOT WORK?!
      })
    }

    getCouponByEndDate(){
      console.log(this.coupModel.end_Date)
        this._webApi.ajaxGetCouponByEndDate(this.coupModel.end_Date).subscribe((resp)=>{
          this.coupons=(resp.json())
          // this.coupons.push(resp.json()) WHY THIS NOT WORK?!
        })
      }

}
