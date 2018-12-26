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

  //get all coupons
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
  //get all coupons by type
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
  //get all coupons by price
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

  //get all purchased coupons
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

//purchase all coupons. that in the data:Coupon[]array. Show Warrning message with relevant exception on each coupon that was unable to purchase.
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

  //Send logot request to WS and redirect to login page.
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
      this._http.post('http://localhost:8080/customer/logout',null).subscribe((resp)=>{
        console.log(resp)
        window.location.href='http://localhost:8080';
      })
    }
  })


 
}

}


