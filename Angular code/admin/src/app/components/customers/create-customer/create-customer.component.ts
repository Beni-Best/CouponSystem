import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Customer } from 'src/app/Common/Customer';
import {WebApiClientService} from './../../../services/web-api-client.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  customer:Customer = new Customer(null,"","");

  constructor(private _http:Http, private _WebApiClientService:WebApiClientService) { }

  ngOnInit() {
  }

  addCustomer(){
this._http.post("http://localhost:8080/admin/createcustomer" ,this.customer).subscribe((resp)=>{
  console.log(resp);
  this._WebApiClientService.ajaxGetAllCustomers();
},(error)=>{
  swal({
   type: 'error',
  title: 'Oops...',
  text: error._body,})
})
  }
}
