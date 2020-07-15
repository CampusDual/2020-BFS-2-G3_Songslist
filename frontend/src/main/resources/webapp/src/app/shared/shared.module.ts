import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { CommonModule } from '@angular/common';
import { ResultContainerModule } from './componets/result-container/result-container.module';
import { ResultContainerComponent } from './componets/result-container/result-container.component';

@NgModule({
  imports: [
    OntimizeWebModule,

  ],
  declarations: [
    ResultContainerComponent
  ],
  exports: [
    CommonModule,
    ResultContainerComponent

  ]
})
export class SharedModule { }
