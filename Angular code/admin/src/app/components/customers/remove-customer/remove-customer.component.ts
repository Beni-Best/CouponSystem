import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Customer } from 'src/app/Common/Customer';
import {WebApiClientService} from './../../../services/web-api-client.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-remove-customer',
  templateUrl: './remove-customer.component.html',
  styleUrls: ['./remove-customer.component.css']
})
export class RemoveCustomerComponent implements OnInit {

  constructor(private _http:Http, private _WebApiClientService:WebApiClientService) { }
  ngOnInit() {
  }
  
  customer:Customer = new Customer(null,"","");
      //Remove this.customer from database. Ask user as protection if he sure he want to delete. Throw error message with exception if failed.
  removeCustomer(){
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
      this._http.delete('http://localhost:8080/admin/removecustomer',new RequestOptions({
        body: this.customer})).subscribe((resp)=>{
          console.log(resp)
          this._WebApiClientService.ajaxGetAllCustomers();
        },(error)=>{
          swal({
           type: 'error',
          title: 'Oops...',
          text: error._body,})
        })
     
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })


   
  }

  // Why this not work ?
  // removeCustomer(){  
  //   this._http.delete('http://localhost:8080/admin/removecustomerbyid/'+this.customer.id).subscribe((resp)=>{
  //       console.log(resp)
  //     })
  // }
  

}
