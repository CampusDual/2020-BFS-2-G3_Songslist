import { NgModule } from '@angular/core';
import { OntimizeWebModule } from 'ontimize-web-ngx';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';


import { AlbumService } from './services/album.service';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { SongComponent } from './song/song.component';
import { SongService } from './services/song.service';
import { ArtistService } from './services/artist.service';

@NgModule({
  imports: [
    SharedModule,
    OntimizeWebModule,
    MainRoutingModule,
  ],
  declarations: [
    AlbumComponent,
    MainComponent,
    ArtistComponent,
    SongComponent
  ], providers: [
    AlbumService,
    ArtistService,
    SongService
  ],
})
export class MainModule { }
