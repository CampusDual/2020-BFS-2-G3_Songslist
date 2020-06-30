import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'ontimize-web-ngx';

import { MainComponent } from './main.component';
import { HomeModule } from './home/home.module';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';

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
        path: '**',
        loadChildren: loadHomeModule
      }
    ]

  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
