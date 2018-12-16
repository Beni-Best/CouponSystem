import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CouponsComponent } from './coupons/coupons.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';


import {WebApiClientService} from './services/web-api-client.service';
import { CreateCouponComponent } from './coupons/create-coupon/create-coupon.component';
import { RemoveCouponComponent } from './coupons/remove-coupon/remove-coupon.component';
import { UpdateCouponComponent } from './coupons/update-coupon/update-coupon.component';
import { GetCouponComponent } from './coupons/get-coupon/get-coupon.component'

@NgModule({
  declarations: [
    AppComponent,
    CouponsComponent,
    CreateCouponComponent,
    RemoveCouponComponent,
    UpdateCouponComponent,
    GetCouponComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:'create',component:CreateCouponComponent},
      {path:'remove',component:RemoveCouponComponent}
    ])
  ],
  providers: [WebApiClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
