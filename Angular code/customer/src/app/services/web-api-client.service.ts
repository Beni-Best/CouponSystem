import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Coupon} from './../common/coupon';
import swal from 'sweetalert2';
import { timeout } from 'q';

@Injectable({
  providedIn: 'root'
})
export class WebApiClientService {

  coupons:Coupon[] = new Array<Coupon>();
  myCoupons:Coupon[] = new Array<Coupon>();

  constructor(private _http:Http) { }

  ajaxGetAllCoupons(){
    this._http.get('http://localhost:8080/customer/getallcoupons').subscribe((resp)=>{
      while(this.coupons.length>0){
        this.coupons.pop();
      }
      let list = resp.json();
      for (let item of list){
        this.coupons.push(item);
      }
      console.log(this.coupons);
    })
  }

  ajaxGetAllCouponsByType(data){
    this._http.get('http://localhost:8080/customer/getallcouponsbytype/'+data).subscribe((resp)=>{
      while(this.coupons.length>0){
        this.coupons.pop();
      }
      let list = resp.json();
      for (let item of list){
        this.coupons.push(item);
      }
      console.log(this.coupons);
    })
  }

  ajaxGetCouponsByPrice(data){
    this._http.get('http://localhost:8080/customer/getallcouponsbyprice/'+data).subscribe((resp)=>{
      while(this.coupons.length>0){
        this.coupons.pop();
      }
      let list = resp.json();
      for (let item of list){
        this.coupons.push(item);
      }
      console.log(this.coupons);
    })
  }

  ajaxGetMyPurchasedCoupons(){
    this._http.get('http://localhost:8080/customer/getallpurchasedcoupons/').subscribe((resp)=>{
      while(this.myCoupons.length>0){
        this.myCoupons.pop();
      }
      let list = resp.json();
      for (let item of list){
        this.myCoupons.push(item);
      }
      console.log(this.myCoupons);
    })
  }


  errorLog :string =" ";
  ajaxPurchaseCoupon(data:Coupon[]){
    for (let coup of data){
     
      this._http.post('http://localhost:8080/customer/purchasecoupon',coup).subscribe((resp)=>{
        console.log(resp);
      } ,(error)=>{
     this.errorLog=this.errorLog.concat(error._body+": "+coup.title+"<br>")
      })
    }
      setTimeout(() => {
        if(this.errorLog!=" "){
          // alert(this.errorLog);
          swal({
            type: 'warning',
            title: 'Important message!',
            html: this.errorLog,
          })
        }
        this.errorLog=" ";
      }, 1000);
  }

ajaxLogout(){

  swal({
    title: 'Are you sure?',
    text: "You will be redirected to the login screen",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout!'
  }).then((result) => {
    if (result.value) {
      this._http.get('http://localhost:8080/customer/logout').subscribe((resp)=>{
        console.log(resp)
      })
      window.location.href='http://localhost:8080/login.html';
    }
  })


 
}

}


