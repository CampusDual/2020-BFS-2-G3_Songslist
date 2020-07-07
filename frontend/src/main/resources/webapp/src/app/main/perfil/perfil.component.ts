import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../services/perfil.service';
import { IUserModel } from 'app/shared/models/iuser.model';
import { ReactiveFormsModule, FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { VALID } from '@angular/forms/src/model';


@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers:[DatePipe]
})
export class PerfilComponent implements OnInit {
   public perfilResult: IUserModel = null;
   // public perfiUpdate: IUserModel ;
   public contactForm: FormGroup = null;
   private id : number;
   public change : boolean = false;
  constructor(
    private perfilService: PerfilService,
    private datePipe: DatePipe
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
            console.log('recibo id ',  userData['data'][0].id_user);
            this.id = userData['data'][0].id_user;
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
  private textPattern: any = /^[a-zA-Z0-9]+(?:[_ -]?[a-zA-Z0-9])*$/;
  // get id() { return this.contactForm.get('id'); }
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get nick() { return this.contactForm.get('nick'); }
  get surname() { return this.contactForm.get('surname'); }
  get birthdate() { return this.contactForm.get('birthdate'); }
  get description() { return this.contactForm.get('description'); }

  createForm(perfilData : IUserModel) {
    console.log('method : createForm')
    console.log('perfilData',perfilData)
    return new FormGroup({
      // id :new FormControl(perfilData ? perfilData.id_user : '' ),
      name: new FormControl(perfilData ? perfilData.nick_user : '' , [ Validators.minLength(0), Validators.maxLength(25),Validators.pattern(this.textPattern)]),
      email: new FormControl(perfilData ? perfilData.email_user: '' , [ Validators.minLength(0), Validators.maxLength(50), Validators.pattern(this.emailPattern)]),
      nick: new FormControl(perfilData ? perfilData.nick_user : '' , [ Validators.minLength(0), Validators.maxLength(25),Validators.pattern(this.textPattern)]),
      surname : new FormControl(perfilData ? perfilData.surname_user : '', [ Validators.minLength(0), Validators.maxLength(50),Validators.pattern(this.textPattern)]),
      birthdate:  new FormControl(perfilData ? this.datePipe.transform(perfilData.birthdate_user, 'yyyy-MM-dd' ) : ''),
      description: new FormControl(perfilData ? perfilData.description_user : '', [ Validators.minLength(0), Validators.maxLength(200)])
    });
  }
  onResetForm(): void {
    this.contactForm.reset();
  }
  inputChange() : boolean{
    if ( this.contactForm.value.name != this.perfilResult.name_user  && this.contactForm.get('name').status == 'VALID'  ){
     return true;
      }
     else if ( this.contactForm.value.email != this.perfilResult.email_user  && this.contactForm.get('email').status == 'VALID'){
        return true;
      }
     else if ( this.contactForm.value.surname != this.perfilResult.surname_user  && this.contactForm.get('surname').status == 'VALID'){
        return true;
      }
    else  if ( this.contactForm.value.birthdate != this.datePipe.transform(this.perfilResult.birthdate_user, 'yyyy-MM-dd' )  && this.contactForm.get('birthdate').status == 'VALID'){
        return true;
      }
     else if ( this.contactForm.value.description != this.perfilResult.description_user  && this.contactForm.get('description').status == 'VALID'  ){
        return true;
      }else {
        return false;
      }
  }

  onSaveForm(): void {
    if(this.contactForm.valid){
      const perfiUpdate : IUserModel  = <IUserModel>   {
      id_user : this.perfilResult.id_user
      }
      if ( this.contactForm.value.name != this.perfilResult.name_user  && this.contactForm.get('name').status == 'VALID'){
      perfiUpdate['name_user'] =this.contactForm.value.nick ;
      }
      if ( this.contactForm.value.email != this.perfilResult.email_user  && this.contactForm.get('email').status == 'VALID'){
      perfiUpdate['email_user'] =this.contactForm.value.email ;
      }
      if ( this.contactForm.value.surname != this.perfilResult.surname_user  && this.contactForm.get('surname').status == 'VALID'){
      perfiUpdate['surname_user'] =this.contactForm.value.surname ;
      }
      if ( this.contactForm.value.birthdate != this.datePipe.transform(this.perfilResult.birthdate_user, 'yyyy-MM-dd' ) && this.contactForm.get('birthdate').status == 'VALID' ){
      perfiUpdate['birthdate_user'] =this.contactForm.value.birthdate ;
      }
      if ( this.contactForm.value.description != this.perfilResult.description_user  && this.contactForm.get('description').status == 'VALID'){
      perfiUpdate['description_user'] =this.contactForm.value. description ;
      }
      console.log('perfiUpdate',perfiUpdate);
      this.perfilService.setUserData(
        perfiUpdate.id_user , perfiUpdate.name_user , perfiUpdate.surname_user, 
        perfiUpdate.email_user , perfiUpdate.birthdate_user , perfiUpdate.description_user 
        ,perfiUpdate.password_user )
      .subscribe(
        (userData: any) => {
          console.log('recibo todo ', userData);
          if (userData['data']) {
            console.log('recibo la parte de data ', userData['data']);
            console.log('nº results ', userData['data'].length);
            if (userData['data'].length > 0) {
              console.log('recibo todo ', userData);
              console.log('recibo id ',  userData['data'][0].id_user);
              this.id = userData['data'][0].id_user;
              this.perfilResult = userData['data'][0];
              this.contactForm=this.createForm(userData['data'][0]); 
              return this.perfilResult;
            } else {
              this.perfilResult = null;
            }
          }
        },
        err => {
          console.error(err)
          this.change = false;
        }
      ); 
      }
    }
}
