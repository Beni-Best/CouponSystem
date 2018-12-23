import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Common/Company';
import {Customer} from './../../Common/Customer';
import {WebApiClientService} from './../../services/web-api-client.service';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  public company: Company[];
  public customers:Customer[];

  constructor(private _WebApiClientService:WebApiClientService) {
    this._WebApiClientService.ajaxGetAllCompany();
    this.company=this._WebApiClientService.company;
   }

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

  ngOnInit() {
  }
   name : string;
   showcustsflag=false;
  getCompaniesCustomers(i:number){
    this.name=this.company[i].name;
    this._WebApiClientService.ajaxGetCompaniesCustomers(i+1);
    this.customers=this._WebApiClientService.customers;
    this.showcustsflag=true;
  }
}
