
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { CreateListComponent } from './create-list.component';
import { MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CreateListDialogComponent } from './create-list-dialog/create-list-dialog.component';

@NgModule({
  imports: [
    OntimizeWebModule,
    MatDialogModule
  ],
  declarations: [
    CreateListComponent,
    CreateListDialogComponent
  ],
  entryComponents: [CreateListDialogComponent],
  exports : [
    CreateListComponent,
    CreateListDialogComponent
  ]


})
export class CreateListModule { }
