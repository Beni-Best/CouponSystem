import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import {Coupon} from './../../common/Coupon';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class WebApiClientService {

  constructor(private _http:Http) { }

  coupons: Coupon [] = new Array<Coupon>();
  


// this method return all coupons and set them in coupons array
  ajaxGetAllCoupons(){
    this._http.get('http://localhost:8080/company/getallcoupons').subscribe((resp)=>{
      {
        while (this.coupons.length > 0)
          this.coupons.pop();
        let list = resp.json();
        for (let item of list)
        {
          this.coupons.push(item);
        }
        console.log(this.coupons)
     
      }
    })
  }

  //creates coupon in the database 
  ajaxCreateCoupon(data:Coupon){
    this._http.post('http://localhost:8080/company/createcoupon',data).subscribe((resp)=>{
      console.log(resp);
      Swal({
        type: 'success',
        title: "Success!",
        text: "Coupon Created!"
      })
      this.ajaxGetAllCoupons()
    },(error)=>{
      Swal({
        type: 'error',
        title: 'Oops...',
        text: error._body,
      })
      console.log(error._body)
    })
  }

  //delete coupon by id from database
  ajaxDeleteCouponById(data:number){

    console.log(data)
     let tmpCoup:Coupon = new Coupon
    tmpCoup.id=data;
    console.log(tmpCoup)

    Swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this._http.delete('http://localhost:8080/company/removecouponbyid',new RequestOptions({body:tmpCoup})).subscribe((resp)=>{
            console.log(resp);
            this.ajaxGetAllCoupons()
          },(error)=>{
            Swal({
             type: 'error',
            title: 'Oops...',
            text: error._body,})
          })
        Swal(
          'Deleted!',
          'Coupon has been deleted.',
          'success'
        )
      }
    })

  }

//delete coupon by title from database
ajaxDeleteCouponByTitle(data:string){
  console.log(data)
     let tmpCoup:Coupon = new Coupon
    tmpCoup.title=data;
    console.log(tmpCoup)

    Swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
       this._http.delete('http://localhost:8080/company/removecoupon',new RequestOptions({body:tmpCoup})).subscribe((resp)=>{
       console.log(resp);
      this.ajaxGetAllCoupons()
          },(error)=>{
            Swal({
             type: 'error',
            title: 'Oops...',
            text: error._body,})
          })
        Swal(
          'Deleted!',
          'Coupon has been deleted.',
          'success'
        )
      }
    })
}

  //this method update coupon price 
  ajaxUpdateCouponPrice(dataPrice:number , dataId:number){
    console.log(dataPrice , dataId)
    
    let tmpCoup:Coupon = new Coupon;

    this._http.get('http://localhost:8080/company/getcoupon/'+dataId).subscribe((resp)=>{
      tmpCoup=resp.json();
      console.log('old coupon',tmpCoup);
       tmpCoup.price=dataPrice;
       console.log('new coupon',tmpCoup);
      this._http.put('http://localhost:8080/company/updatecoupon',tmpCoup).subscribe((resp)=>{
        console.log(resp)
        Swal({
          type: 'success',
          title: "Success!",
          text: "Coupon price updated!"
        })
        this.ajaxGetAllCoupons()
      },(error)=>{
        Swal({
          type: 'error',
          title: 'Oops...',
          text: error._body,
        })
        console.log(error._body)
      })
    },(error)=>{
      Swal({
        type: 'error',
        title: 'Oops...',
        text: error._body,
      })
      console.log(error._body)
    })
  }

  //this method update coupon end date
  ajaxUpdateCouponEndDate(dataDate:Date , dataId:number){
    console.log(dataDate , dataId)
    
    let tmpCoup:Coupon = new Coupon;
    
    this._http.get('http://localhost:8080/company/getcoupon/'+dataId).subscribe((resp)=>{
      tmpCoup=resp.json();
      console.log('old coupon',tmpCoup);
       tmpCoup.end_Date=dataDate;
       console.log('new coupon',tmpCoup);
      this._http.put('http://localhost:8080/company/updatecoupon',tmpCoup).subscribe((resp)=>{
        console.log(resp)
        Swal({
          type: 'success',
          title: "Success!",
          text: "Coupon end date updated!"
        })
        this.ajaxGetAllCoupons()
      },(error)=>{
        Swal({
          type: 'error',
          title: 'Oops...',
          text: error._body,
        })
        console.log(error._body)
      })

    },(error)=>{      
      Swal({
        type: 'error',
        title: 'Oops...',
        text: error._body,
      })
      console.log(error._body)
    })
     
  }

    //return coupon by id 
    ajaxGetCouponById(data : number){
      return   this._http.get('http://localhost:8080/company/getcoupon/'+data);
    }
    //return allcoupons by type
    ajaxGetCouponByType(data : string){
      console.log(data)
      return   this._http.get('http://localhost:8080/company/getcouponsbytype/'+data);
    }
    //return all coupons by price
    ajaxGetCouponByPrice(data : number){
      console.log(data)
      return   this._http.get('http://localhost:8080/company/getcouponsbyprice/'+data);
    }
    //return all coupons by end Date
    ajaxGetCouponByEndDate(data : Date){
      console.log(data)
      return   this._http.get('http://localhost:8080/company/getcouponsbyenddate/'+data);
    }

    //Send logout to WS and redirect to login page
    ajaxLogout(){
      Swal({
        title: 'Are you sure?',
        text: "You will be redirected to the login screen",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, logout!'
      }).then((result) => {
        if (result.value) {
          this._http.post('http://localhost:8080/company/logout',null).subscribe((resp)=>{
            console.log(resp)
            window.location.href='http://localhost:8080';
          })
        }
      })

     
    }
}
