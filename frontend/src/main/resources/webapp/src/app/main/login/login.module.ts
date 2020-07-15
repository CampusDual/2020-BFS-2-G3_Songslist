import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';

import { LoginComponent } from './login.component';
//import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule
   // LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ]
  ,
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
