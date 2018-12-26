import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Common/Customer';
import { Http } from '@angular/http';
import {WebApiClientService} from './../../../services/web-api-client.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-get-customer',
  templateUrl: './get-customer.component.html',
  styleUrls: ['./get-customer.component.css']
})
export class GetCustomerComponent implements OnInit {

  customer:Customer=new Customer(null,"","")
  showCust:Customer=new Customer(null,"","")
  constructor(private _http:Http, private _WebApiClientService:WebApiClientService) { }

  ngOnInit() {
  }

    //get Customer. If this.customer.name=''(empty string) it will get customer by id otherwise it will get customer by this.customer.name. Show error message with exception if failed
  getCustomer(){
    if(this.customer.name==''){
      this._http.get('http://localhost:8080/admin/getcustomer/'+this.customer.id).subscribe((resp)=>{
        console.log(resp)
      this.showCust=resp.json();
      this._WebApiClientService.ajaxGetAllCustomers();
      },(error)=>{
        swal({
         type: 'error',
        title: 'Oops...',
        text: error._body,})
      })
    }else{
      this._http.get('http://localhost:8080/admin/getcustomerbyname/'+this.customer.name).subscribe((resp)=>{
        console.log(resp)
      this.showCust=resp.json();
      this._WebApiClientService.ajaxGetAllCustomers();
      },(error)=>{
        swal({
         type: 'error',
        title: 'Oops...',
        text: error._body,})
      })
    }

  }



}
