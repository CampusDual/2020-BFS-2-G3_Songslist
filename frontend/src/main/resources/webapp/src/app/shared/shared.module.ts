import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { CommonModule } from '@angular/common';
import { ResultContainerModule } from './componets/result-container/result-container.module';
import { ResultContainerComponent } from './componets/result-container/result-container.component';
import { RouterModule } from '@angular/router';
import { CreateListModule } from './models/create-list/create-list.module';
import { ResultListComponent } from './componets/result-list/result-list.component';
import { SendMenssagesComponent } from './componets/send-menssages/send-menssages.component';
import { ReceiveMenssagesComponent } from './componets/receive-menssages/receive-menssages.component';

@NgModule({
  imports: [
    OntimizeWebModule,
    RouterModule,
    CreateListModule

  ],
  declarations: [
    ResultContainerComponent,
    ResultListComponent,
    SendMenssagesComponent,
    ReceiveMenssagesComponent
  ],
  exports: [
    CommonModule,
    ResultContainerComponent,
    CreateListModule,
    ResultListComponent,
    SendMenssagesComponent,
    ReceiveMenssagesComponent

  ]
})
export class SharedModule { }
