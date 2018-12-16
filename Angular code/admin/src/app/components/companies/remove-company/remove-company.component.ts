import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Company } from 'src/app/Common/Company';
import {WebApiClientService} from './../../../services/web-api-client.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-remove-company',
  templateUrl: './remove-company.component.html',
  styleUrls: ['./remove-company.component.css']
})
export class RemoveCompanyComponent implements OnInit {

  company:Company = new Company(null,"","","");
  
  constructor(private _http:Http ,private _WebApiClientService:WebApiClientService) { }

  removeCompany(){
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
        this._http.delete('http://localhost:8080/admin/removecompany',new RequestOptions({
          body: this.company})).subscribe((resp)=>{
            console.log(resp)
            this._WebApiClientService.ajaxGetAllCompany();
          },(error)=>{
            swal({
             type: 'error',
            title: 'Oops...',
            text: error._body,})
          })
        swal(
          'Deleted!',
          'Company has been deleted.',
          'success'
        )
      }
    })



   
  }


  ngOnInit() {
  }

}
