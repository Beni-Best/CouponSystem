import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/Common/Company';
import { Http } from '@angular/http';
import swal from 'sweetalert2';

@Component({
  selector: 'app-get-company',
  templateUrl: './get-company.component.html',
  styleUrls: ['./get-company.component.css']
})
export class GetCompanyComponent implements OnInit {

  company:Company=new Company(null,"","")
  showComp:Company=new Company(0,"","")
  constructor(private _http:Http) { }

   //get company. If this.company.name=''(empty string) it will get company by id otherwise it will get company by this.company.name. Show error message with exception if failed
  getCompany(){
    if(this.company.name==''){
      this._http.get('http://localhost:8080/admin/getcompany/'+this.company.id).subscribe((resp)=>{
        console.log(resp)
      this.showComp=resp.json();
      },(error)=>{
        swal({
         type: 'error',
        title: 'Oops...',
        text: error._body,})
      })
    }else{
      this._http.get('http://localhost:8080/admin/getcompanybyname/'+this.company.name).subscribe((resp)=>{
        console.log(resp)
      this.showComp=resp.json();
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
