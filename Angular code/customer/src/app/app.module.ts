import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';

import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {WebApiClientService} from './services/web-api-client.service';
import {RouterModule} from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { GetCouponsComponent } from './get-coupons/get-coupons.component';
import { MyCouponsComponent } from './my-coupons/my-coupons.component';


@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    CartComponent,
    GetCouponsComponent,
    MyCouponsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // RouterModule.forRoot([
    //   {path:'cart',component:CartComponent},
    //   {path:'getcoups',component:GetCouponsComponent}
    // ])
  ],
  providers: [WebApiClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
