import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Customer} from './../Common/Customer';
import {Company} from './../Common/Company';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class WebApiClientService {

  constructor(private _http:Http) { }

  //  ajaxGetAllCustomers(){
  // return  this._http.get('http://localhost:8080/admin/getallcustomer');
  // }
  customers :Customer[] = new Array<Customer>();
  company :Company[] = new Array<Company>();
  ajaxGetAllCustomers(){
      this._http.get('http://localhost:8080/admin/getallcustomer').subscribe((resp)=>{
      while(this.customers.length>0){
        this.customers.pop();
      }
      let items = resp.json();
      for (let item of items){
        this.customers.push(item);
      }
      console.log(this.customers);
    })
    }

    ajaxGetAllCompany(){
      this._http.get('http://localhost:8080/admin/getallcompanies').subscribe((resp)=>{
      while(this.company.length>0){
        this.company.pop();
      }
      let items = resp.json();
      for (let item of items){
        this.company.push(item);
      }
      console.log(this.company);
    })
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
          this._http.post('http://localhost:8080/admin/logout',null).subscribe((resp)=>{
            console.log(resp)
            window.location.href='http://localhost:8080';
          })
        }
      })

    }

    ajaxGetCompaniesCustomers(id:number){
      console.log(id)
      this._http.get('http://localhost:8080/admin/getallcustomerbycompany/'+id).subscribe((resp)=>{
        while(this.customers.length>0){
          this.customers.pop();
        }
        let items = resp.json();
        for (let item of items){
          this.customers.push(item);
        }
        console.log(this.customers);
      })
    }
}
