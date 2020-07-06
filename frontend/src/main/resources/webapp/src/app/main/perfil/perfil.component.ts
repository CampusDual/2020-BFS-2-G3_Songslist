import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../services/perfil.service';
import { IUserModel } from 'app/shared/models/iuser.model';
import { ReactiveFormsModule, FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';


@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
   public perfilResult: IUserModel = null;
   public contactForm: FormGroup = null;
  constructor(
    private perfilService: PerfilService
    ) {  }
  ngOnInit() {
     this.ngOnStartUser();
  }
  ngOnStartUser () : IUserModel {
    console.log('iniciando');
    console.log('method : ngOnStartUser')
    this.perfilService.getUserData().subscribe(
      (userData: any) => {
        console.log('recibo todo ', userData);
        if (userData['data']) {
          console.log('recibo la parte de data ', userData['data']);
          console.log('nº results ', userData['data'].length);
          if (userData['data'].length > 0) {
            console.log('recibo todo ', userData);
            this.perfilResult = userData['data'][0];
            this.contactForm=this.createForm(userData['data'][0]); 
            return this.perfilResult;
          } else {
            this.perfilResult = null;
          }
        }
      },
      err => console.error(err)
    ); 
    return this.perfilResult = null;
  }

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }

  get nick() { return this.contactForm.get('nick'); }
  get name_u() { return this.contactForm.get('name_u'); }
  get surname() { return this.contactForm.get('surname'); }
  get birthdate() { return this.contactForm.get('birthdate'); }
  get description() { return this.contactForm.get('description'); }

  createForm(perfilData : IUserModel) {
    console.log('method : createForm')
    console.log('perfilData',perfilData)
    return new FormGroup({
      name: new FormControl(perfilData ? perfilData.nick_user : '' , [Validators.required, Validators.minLength(3)]),
      email: new FormControl(perfilData ? perfilData.email_user: '' , [Validators.required, Validators.minLength(3), Validators.pattern(this.emailPattern)]),
      nick: new FormControl(perfilData ? perfilData.nick_user : '' , [Validators.required, Validators.minLength(3)]),
      name_u: new FormControl(perfilData ? perfilData.name_user : '' , [Validators.required, Validators.minLength(3)]),
      surname : new FormControl(perfilData ? perfilData.surname_user : '', [Validators.required, Validators.minLength(3)]),
      birthdate:  new FormControl(perfilData ? perfilData.birthdate_user : '', [Validators.required, Validators.minLength(3)]),
      description: new FormControl(perfilData ? perfilData.description_user : '', [Validators.required, Validators.minLength(10), Validators.maxLength(100)])

    });
  }
  onResetForm(): void {
    this.contactForm.reset();
  }
  onSaveForm(): void {
    console.log('pulsoboton')
    if (this.contactForm.valid) {
      this.perfilService.saveMessage(this.contactForm.value);
      this.onResetForm();
    }
  }

  

}
