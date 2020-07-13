import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SharedModule } from '../../shared/shared.module';
import { SonglistComponent } from './songlist.component';
import { CreateListModule } from '../create-list/create-list.module';
import { CreateListComponent } from '../create-list/create-list.component';
import { CreateListDialogComponent } from '../create-list/create-list-dialog/create-list-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    CreateListModule
  ],
  declarations: [
    SonglistComponent
  ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class SonglistModule { }