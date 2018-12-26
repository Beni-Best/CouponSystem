import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Company } from 'src/app/Common/Company';
import {WebApiClientService} from './../../../services/web-api-client.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  company :Company = new Company(null,"","","")

  constructor(private _http:Http,private _WebApiClientService:WebApiClientService) { }

  ngOnInit() {
  }
  //add company in the databse , show error message with exception if failed.
  addCompany(){
    this._http.post("http://localhost:8080/admin/createcompany" ,this.company).subscribe((resp)=>{
      console.log(resp);
      swal({
        type: 'success',
        title: "Success!",
        text: "Company Created!"
      })
      this._WebApiClientService.ajaxGetAllCompany();
    },(error)=>{
      swal({
       type: 'error',
      title: 'Oops...',
      text: error._body,})
    })
      }

}
