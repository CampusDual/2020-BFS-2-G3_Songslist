import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../services/perfil.service';
import { IUserModel } from 'app/shared/models/iuser.model';


@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public perfilResult: IUserModel;

  constructor(

    private perfilService: PerfilService

  ) { }

  ngOnInit() {
    console.log('iniciando');
    this.ngOnStartUser();
  }
  ngOnStartUser(){
    console.log(' metho : ngOnStartUser');
    this.perfilService.getUserData().subscribe(
      (userData: any) => {
        console.log('recibo todo ', userData);
        if (userData['data']) {
          console.log('recibo la parte de data ', userData['data']);
          console.log('nº results ', userData['data'].length);
          if (userData['data'].length > 0) {
            console.log('recibo todo ', userData);
            this.perfilResult = userData['data'];
          } else {
            this.perfilResult = null;
          }
        }
      },
      err => console.error(err)
    );  
  }
  getUserDescription(){
    return this.perfilResult.description_user;
  }

}
