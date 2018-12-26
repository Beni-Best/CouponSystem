import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Customer } from 'src/app/Common/Customer';
import {WebApiClientService} from './../../../services/web-api-client.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  customer: Customer = new Customer(null,"","")

  constructor(private _http:Http,private _WebApiClientService:WebApiClientService) { }
  //update customer in the database, Param string. 
  updateCustomer(){
    this._http.put('http://localhost:8080/admin/updatecustomer',this.customer).subscribe((resp)=>{
      console.log(resp);
      swal({
        type: 'success',
        title: "Success!",
        text: "Customer Updated!"
      })
      this._WebApiClientService.ajaxGetAllCustomers();
    },(error)=>{
      swal({
       type: 'error',
      title: 'Oops...',
      text: error._body,})
    })
  }


  ngOnInit() {
  }

}
