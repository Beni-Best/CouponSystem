import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {WebApiClientService}from './services/web-api-client.service';

import { AppComponent } from './app.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CreateCustomerComponent } from './components/customers/create-customer/create-customer.component';
import { RemoveCustomerComponent } from './components/customers/remove-customer/remove-customer.component';
import { UpdateCustomerComponent } from './components/customers/update-customer/update-customer.component';
import { GetCustomerComponent } from './components/customers/get-customer/get-customer.component';
import { CreateCompanyComponent } from './components/companies/create-company/create-company.component';
import { RemoveCompanyComponent } from './components/companies/remove-company/remove-company.component';
import { UpdateCompanyComponent } from './components/companies/update-company/update-company.component';
import { GetCompanyComponent } from './components/companies/get-company/get-company.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CompaniesComponent,
    CreateCustomerComponent,
    RemoveCustomerComponent,
    UpdateCustomerComponent,
    GetCustomerComponent,
    CreateCompanyComponent,
    RemoveCompanyComponent,
    UpdateCompanyComponent,
    GetCompanyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'compcomp', component:CompaniesComponent},
      {path:'custcomp', component:CustomersComponent},
      {path:'custcreate', component:CreateCustomerComponent}
    ])
  ],
  providers: [WebApiClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
