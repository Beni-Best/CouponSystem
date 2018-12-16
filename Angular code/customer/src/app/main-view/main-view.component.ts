import { Component, OnInit } from '@angular/core';
import {WebApiClientService} from './../services/web-api-client.service';
import {Coupon} from './../common/coupon';
import swal from 'sweetalert2';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  coupons:Coupon [] = new Array<Coupon>();
  cartCoupons:Coupon [] = new Array<Coupon>();
  
  cartCounter:number=0;
  
  constructor(private _WebApiClientService:WebApiClientService) { 
    this._WebApiClientService.ajaxGetAllCoupons();
    this.coupons=_WebApiClientService.coupons;


  }

  ngOnInit() {
  }

  typeName:string="";
  getCouponsByType(data:string){
    this.typeName=data;
    this._WebApiClientService.ajaxGetAllCouponsByType(data);
    this.price=null;
  }
  getAllCoupons(){
    this.typeName="";
    this._WebApiClientService.ajaxGetAllCoupons();
    this.showcartflag=false;
    this.showmycoupsflag=false;
  }


  addToCart(index){
    for(let a of this.cartCoupons){
      if(a===this.coupons[index]){
      //  alert("you already added this coupon to your cart")
       swal({
        type: 'warning',
        title: 'Opss...',
        text:'you already added this coupon to your cart :)',
      })
       return;
      }
    }
        this.cartCoupons.push(this.coupons[index]);
    this.cartCounter++;
    // this._WebApiClientService.testCounter++;
    swal({
      type: 'success',
      title: 'Nice!',
      text:'coupon added to your cart :)',
    })
  }

  removed(){
    this.cartCounter--;
  }

  showcartflag=false;
  showmycoupsflag=false;
  showCart(data:string){
    if(data==='mycoups'){
      this.showmycoupsflag=true;
      this.showcartflag=false;
    }
    if(data==='cart'){
      this.showmycoupsflag=false;
      this.showcartflag=true;
    }
  }


  price:number;
  getCouponsByPrice(){
    this.typeName="";
    if(this.price){
      this._WebApiClientService.ajaxGetCouponsByPrice(this.price);
    }else{
      swal({
        type: 'warning',
        title: 'Enter Price!',
      })
    }
  }

  getMyPurchasedCoupon(){
    this._WebApiClientService.ajaxGetMyPurchasedCoupons();
  }
//   myCartFunc(){
 
  logout(){
    this._WebApiClientService.ajaxLogout();
  }
    


}