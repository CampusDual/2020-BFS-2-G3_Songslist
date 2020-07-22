import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { CommonModule } from '@angular/common';
import { ResultContainerModule } from './componets/result-container/result-container.module';
import { ResultContainerComponent } from './componets/result-container/result-container.component';
import { RouterModule } from '@angular/router';
import { CreateListModule } from './modules/create-list/create-list.module';
import { ResultListComponent } from './componets/result-list/result-list.component';
import { DefaultContainerComponent } from './componets/default-container/default-container.component';

@NgModule({
  imports: [
    OntimizeWebModule,
    RouterModule,
    CreateListModule

  ],
  declarations: [
    ResultContainerComponent,
    DefaultContainerComponent,
    ResultListComponent
  ],
  exports: [
    CommonModule,
    ResultContainerComponent,
    DefaultContainerComponent,
    CreateListModule,
    ResultListComponent

  ]
})
export class SharedModule { }
