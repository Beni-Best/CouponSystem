import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import {WebApiClientService} from './../../services/web-api-client.service';
import {Coupon} from './../../../common/Coupon';

@Component({
  selector: 'app-remove-coupon',
  templateUrl: './remove-coupon.component.html',
  styleUrls: ['./remove-coupon.component.css']
})
export class RemoveCouponComponent implements OnInit {

  constructor(private _webService:WebApiClientService) { }

  // @Output('do') couponCreated = new EventEmitter();

  ngOnInit() {
  }

  //remoevs coupon using tmpCoup. Remove by id if tmpCoup.id !=null , if tmpCoup.id==0/null Remove by Title
  tmpCoup:Coupon = new Coupon;
  remove(){
    if(this.tmpCoup.id!=null){
   this._webService.ajaxDeleteCouponById(this.tmpCoup.id);
  }else if(this.tmpCoup.title!=null && this.tmpCoup.title!=''){
   this._webService.ajaxDeleteCouponByTitle(this.tmpCoup.title)
  }
  }

 
}
