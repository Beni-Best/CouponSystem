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
  
   refreshCoupons(){
  
    this._WebApiClientService.ajaxGetAllCoupons();
    // this.coupons=this._WebApiClientService.coupons;
   }


   logout(){
    this._WebApiClientService.ajaxLogout();
   }




  //  showcreateflag=false;
  //  showdeleteflag=false;
  //  showupdateflag=false;
  //  showgetflag=false;
  //  show(data:string){
  //    if(data==='create'){
  //      this.showdeleteflag=false;
  //      this.showupdateflag=false;
  //      this.showgetflag=false;
  //      this.showcreateflag=true;
  //    }else if(data==='delete'){
  //      this.showcreateflag=false;
  //      this.showupdateflag=false;
  //      this.showgetflag=false;
  //      this.showdeleteflag=true;
  //    }else if(data==='update'){
  //     this.showcreateflag=false;
  //     this.showdeleteflag=false;
  //     this.showgetflag=false;
  //     this.showupdateflag=true;
  //    }else if(data==='get'){
  //     this.showcreateflag=false;
  //     this.showdeleteflag=false;
  //     this.showupdateflag=false;
  //     this.showgetflag=true;
  //    }
  //  }

  ngOnInit() {
    
  }
  

}
