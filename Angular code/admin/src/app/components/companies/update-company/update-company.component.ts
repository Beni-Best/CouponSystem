import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Common/Company';
import { Http } from '@angular/http';
import {WebApiClientService} from './../../../services/web-api-client.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit {

  company: Company = new Company(null,"","","")

  constructor(private _http:Http ,private _WebApiClientService:WebApiClientService) { }

  updateCompany(string:string){
    var tmpComp:Company = new Company(0,this.company.name,"","")

    if(string=='password'){

     this._http.get('http://localhost:8080/admin/getcompanybyname/'+this.company.name).subscribe((resp)=>{
       console.log(resp);
       tmpComp=resp.json();
       console.log(tmpComp)

       tmpComp.password=this.company.password;
       this._http.put('http://localhost:8080/admin/updatecompany/',tmpComp).subscribe((resp)=>{
         console.log(resp);
         this._WebApiClientService.ajaxGetAllCompany();
       },(error)=>{
         swal({
          type: 'error',
         title: 'Oops...',
         text: error._body,})
       })
      },(error)=>{
        swal({
         type: 'error',
        title: 'Oops...',
        text: error._body,})
      })
       

    }else{
      this._http.get('http://localhost:8080/admin/getcompanybyname/'+this.company.name).subscribe((resp)=>{
        console.log(resp);
        tmpComp=resp.json();
        console.log(tmpComp)
 
        tmpComp.email=this.company.email;
        this._http.put('http://localhost:8080/admin/updatecompany/',tmpComp).subscribe((resp)=>{
          console.log(resp);
          this._WebApiClientService.ajaxGetAllCompany();
        },(error)=>{
          swal({
           type: 'error',
          title: 'Oops...',
          text: error._body,})
        })
       },(error)=>{
        swal({
         type: 'error',
        title: 'Oops...',
        text: error._body,})
      })
    }
     

   
  }


  ngOnInit() {
  }

}
