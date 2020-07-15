import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultContainerComponent } from './result-container.component';
import { SharedModule } from 'app/shared/shared.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    CommonModule
  ],
  declarations: [
    //ResultContainerComponent
  ],
  exports: [ResultContainerComponent],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ResultContainerModule { }
