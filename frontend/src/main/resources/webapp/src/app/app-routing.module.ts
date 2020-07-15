import { NgModule, NgModuleFactory } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from './main/login/login.module';
import { MainModule } from './main/main.module';
import { RegisterModule } from './register/register.module';
import { PerfilComponent } from './main/perfil/perfil.component';

export function loadLoginModule() {
  return LoginModule;
}

export function loadRegisterModule() {
  return RegisterModule;
}

export function loadMainModule() {
  return MainModule;
}

export function  loadSettingsModule(){
  return RegisterModule;
 // return PerfilComponent;
}

export const routes: Routes = [
  { path: 'main', loadChildren: loadMainModule },
  { path: 'login', loadChildren: loadLoginModule },
  { path: 'register', loadChildren: loadRegisterModule },
  { path: 'settings', loadChildren: loadSettingsModule },
  { path: '', redirectTo: 'main', pathMatch: 'full' }
];

const opt = {
  enableTracing: false
  // true if you want to print navigation routes
};

@NgModule({
  imports: [RouterModule.forRoot(routes, opt)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
