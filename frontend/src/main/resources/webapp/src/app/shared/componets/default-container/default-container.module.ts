import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultContainerComponent } from './default-container.component';
import { SharedModule } from 'app/shared/shared.module';
import { OntimizeWebModule } from 'ontimize-web-ngx';


@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    CommonModule,

  ],
  declarations: [
    //ResultContainerComponent
  ],
  exports: [DefaultContainerComponent],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DefaultContainerModule { }
