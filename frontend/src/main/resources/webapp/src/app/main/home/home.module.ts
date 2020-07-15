import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CreateListModule } from '../create-list/create-list.module';
import { ResultContainerComponent } from 'app/shared/componets/result-container/result-container.component';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    HomeRoutingModule,
    CreateListModule
  ],
  declarations: [
    HomeComponent,
  ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
