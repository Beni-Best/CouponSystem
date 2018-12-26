import { Component, OnInit } from '@angular/core';
import {Customer}from './../../Common/Customer';
import {Http} from '@angular/http';
import {WebApiClientService} from './../../services/web-api-client.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

   customers : Customer[] = new Array<Customer>();

   //one of the ways to show and hide components
  showcreateflag=false;
  showremoveflag=false;
  showupdateflag=false;
  showgetflag=false;
  show(string:string){
    if(string=='create'){
      this.showremoveflag=false;
      this.showupdateflag=false;
      this.showgetflag=false;
      this.showcreateflag=true;
    }
    if(string=='remove'){
      this.showcreateflag=false;
      this.showupdateflag=false;
      this.showgetflag=false;
      this.showremoveflag=true;
    }
    if(string=='update'){
      this.showupdateflag=true;
      this.showcreateflag=false;
      this.showremoveflag=false;
      this.showgetflag=false;
    } if(string=='get'){
      this.showupdateflag=false;
      this.showcreateflag=false;
      this.showremoveflag=false;
      this.showgetflag=true;
    }
  }

    constructor(private _WebApiClientService:WebApiClientService) {
    
       }
     
  //shows all customers on customer component initiation
  ngOnInit() {
    while(this.customers.length>0){
      this.customers.pop
    }
    this._WebApiClientService.ajaxGetAllCustomers();
    this.customers=this._WebApiClientService.customers;
  }

}
