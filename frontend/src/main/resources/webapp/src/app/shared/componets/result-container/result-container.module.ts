import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultContainerComponent } from './result-container.component';
import { SharedModule } from 'app/shared/shared.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { CreateListModule } from 'app/main/create-list/create-list.module';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    CommonModule,
    CreateListModule
  ],
  declarations: [
    //ResultContainerComponent
  ],
  exports: [ResultContainerComponent],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ResultContainerModule { }
