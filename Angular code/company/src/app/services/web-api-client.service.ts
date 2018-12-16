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

  ajaxCreateCoupon(data:Coupon){
    this._http.post('http://localhost:8080/company/createcoupon',data).subscribe((resp)=>{
      console.log(resp);
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

  

  ajaxDeleteCouponById(data:number){
    console.log(data)
     let tmpCoup:Coupon = new Coupon
    tmpCoup.id=data;
    console.log(tmpCoup)
this._http.delete('http://localhost:8080/company/removecouponbyid',new RequestOptions({body:tmpCoup})).subscribe((resp)=>{
  console.log(resp);
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

  ajaxDeleteCouponByTitle(data:string){
    console.log(data)
     let tmpCoup:Coupon = new Coupon
    tmpCoup.title=data;
    console.log(tmpCoup)
this._http.delete('http://localhost:8080/company/removecoupon',new RequestOptions({body:tmpCoup})).subscribe((resp)=>{
  console.log(resp);

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

    ajaxGetCouponById(data : number){
      return   this._http.get('http://localhost:8080/company/getcoupon/'+data);
    }
    ajaxGetCouponByType(data : string){
      console.log(data)
      return   this._http.get('http://localhost:8080/company/getcouponsbytype/'+data);
    }
    ajaxGetCouponByPrice(data : number){
      console.log(data)
      return   this._http.get('http://localhost:8080/company/getcouponsbyprice/'+data);
    }
    ajaxGetCouponByEndDate(data : Date){
      console.log(data)
      return   this._http.get('http://localhost:8080/company/getcouponsbyenddate/'+data);
    }

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
          this._http.get('http://localhost:8080/company/logout').subscribe((resp)=>{
            console.log(resp)
          })
          window.location.href='http://localhost:8080/login.html';
        }
      })

     
    }
}
