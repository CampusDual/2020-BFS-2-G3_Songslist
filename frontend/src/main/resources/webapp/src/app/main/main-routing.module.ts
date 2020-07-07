import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'ontimize-web-ngx';
import { MainComponent } from './main.component';
import { HomeModule } from './home/home.module';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { SongComponent } from './song/song.component';
import { PerfilComponent } from './perfil/perfil.component';

export function loadHomeModule() {
  return HomeModule;
}


export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: loadHomeModule
      },{
        path: 'song/:id',
        component: SongComponent
      }, 
      {
        path: 'album/:id',
        component: AlbumComponent
      },   
      {
        path: 'artist/:id',
        component: ArtistComponent
      },       
      {
        path: 'perfil',
        component: PerfilComponent
      },       
      {
        path: '**',
        loadChildren: loadHomeModule
      }
    ],
    

  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
