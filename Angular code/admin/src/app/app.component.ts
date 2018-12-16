import { Component } from '@angular/core';
import {WebApiClientService} from './services/web-api-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-admin';

  constructor(private _WebApiClientService:WebApiClientService){

  }

  logout (){
    this._WebApiClientService.ajaxLogout();
  }
}
