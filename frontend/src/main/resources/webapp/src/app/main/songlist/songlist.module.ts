import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SharedModule } from '../../shared/shared.module';
import { SonglistComponent } from './songlist.component';




@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,

  ],
  declarations: [
    SonglistComponent
  ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class SonglistModule { }