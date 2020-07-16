import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from 'ontimize-web-ngx';
import { MainComponent } from './main.component';
import { HomeModule } from './home/home.module';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { SongComponent } from './song/song.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from 'app/main/login/login.component';
import { SonglistComponent } from './songlist/songlist.component';
import { SonglistModule } from './songlist/songlist.module';
import { SonglistDetailComponent } from './songlist-detail/songlist-detail.component';
import { LoginModule } from './login/login.module';
export function loadHomeModule() {
  return HomeModule;
}
export function loadLoginModule() {
  return LoginModule;
}
export function loadSonglistModule() {
  return SonglistModule;
}
function User (): boolean {
  return JSON.parse(localStorage.getItem('com.ontimize.web.ngx.jee.seed')).session.id ;
}
export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
   // canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: loadHomeModule
      },
      {
        path: 'login',
        component: LoginComponent      },
      {
        path: 'song/:id',
        component: SongComponent
      }, {
        path: 'songlist',
        component : SonglistComponent,
        canActivate: [AuthGuardService], 
      }, 
      {
        path: 'album/:id',
        component: AlbumComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'artist/:id',
        component: ArtistComponent
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'songlistdetail/:id',
        component: SonglistDetailComponent
      },
      {
        path: 'settings',
        component: User ? PerfilComponent : LoginComponent
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
