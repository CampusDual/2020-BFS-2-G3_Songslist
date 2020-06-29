import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { SongComponent } from './song/song.component';
import { SongService } from './services/song.service';


@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
    SongComponent
    
  ], providers: [
    SongService
  ]
})
export class MainModule { }
