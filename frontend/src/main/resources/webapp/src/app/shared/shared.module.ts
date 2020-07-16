import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { CommonModule } from '@angular/common';
import { ResultContainerModule } from './componets/result-container/result-container.module';
import { ResultContainerComponent } from './componets/result-container/result-container.component';
import { RouterModule } from '@angular/router';
import { CreateListModule } from './models/create-list/create-list.module';

@NgModule({
  imports: [
    OntimizeWebModule,
    RouterModule,
    CreateListModule

  ],
  declarations: [
    ResultContainerComponent
  ],
  exports: [
    CommonModule,
    ResultContainerComponent,
    CreateListModule

  ]
})
export class SharedModule { }
