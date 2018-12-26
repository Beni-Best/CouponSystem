import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Coupon} from './../common/coupon';
import {WebApiClientService} from './../services/web-api-client.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  
  @Output() removePressed:EventEmitter<number>=new EventEmitter<number>();
  @Input() coupons:Coupon[]= new Array<Coupon>();
  constructor(private _WebApiClientService:WebApiClientService) { }
  

  ngOnInit() {
    console.log()
  }

  //remove coupon from cart
  removeFromCart(data){
    this.coupons.splice(data,1)
    this.removePressed.emit(1);
  }

  //purchase all coupons that in the cart
  buyCoupons(){
    this._WebApiClientService.ajaxPurchaseCoupon(this.coupons);
    while(this.coupons.length>0){
      this.coupons.pop();
      this.removePressed.emit(1);
    }
  }
  }

