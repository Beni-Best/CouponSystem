import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Common/Company';
import {WebApiClientService} from './../../services/web-api-client.service';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  public company: Company[];
  // constructor(private _http:Http) {
  //   this._http.get('http://localhost:8080/admin/getallcompanies').subscribe((resp)=>{
  //     this.company=resp.json()
  //   })
  //  }
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

}
