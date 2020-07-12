import { Component, OnInit } from '@angular/core';
import { PerfilService } from '../services/perfil.service';
import { IUserModel } from 'app/shared/models/iuser.model';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { VALID } from '@angular/forms/src/model';
import { SnackBarService, OSnackBarConfig, DialogService } from 'ontimize-web-ngx';
import { MatDialog } from '@angular/material';



@Component({
  selector: 'app-perfil-edit',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [DatePipe]
})
export class PerfilComponent implements OnInit {
  ico_png = './assets/images/ico/avatar/png/';
  public img1 = this.ico_png + '1.png';
  public img2 = this.ico_png + '2.png';
  public img3 = this.ico_png + '3.png';
  public img4 = this.ico_png + '4.png';
  public img5 = this.ico_png + '5.png';
  public img6 = this.ico_png + '6.png';
  public img7 = this.ico_png + '7.png';
  public img8 = this.ico_png + '8.png';
  public img9 = this.ico_png + '9.png';
  public img10 = this.ico_png + '10.png';
  public img11 = this.ico_png + '11.png';
  public img12 = this.ico_png + '12.png';



  public perfilResult: IUserModel;
  // public perfiUpdate: IUserModel ;
  public contactForm: FormGroup;
  public alert: number;
  public change: boolean = false;


  passFormControl = new FormControl('', [
    Validators.required,
  ]);
  confirmFormControl = new FormControl('', [
    Validators.required,
  ]);

  hide = true;

  public imgselect: string;
  constructor(
    private perfilService: PerfilService,
    private datePipe: DatePipe,
    protected snackBarService: SnackBarService,
    public dialog: MatDialog,
    protected dialogService: DialogService
  ) { }
  ngOnInit() {
    this.ngOnStartForm();
  }
  ngOnStartForm(): IUserModel {
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
            console.log('recibo id ', userData['data'][0].id_user);
            this.perfilResult = userData['data'][0];
            this.contactForm = this.createForm(userData['data'][0]);
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
  get nick() { return this.contactForm.get('nick'); }
  get passw() { return this.contactForm.get('passw'); }
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get surname() { return this.contactForm.get('surname'); }
  get birthdate() { return this.contactForm.get('birthdate'); }
  get description() { return this.contactForm.get('description'); }
  get newpassw() { return this.contactForm.get('description'); }
  get repnewpassw() { return this.contactForm.get('description'); }

  createForm(perfilData: IUserModel) {
    console.log('method : createForm')
    console.log('perfilData', perfilData)
    return new FormGroup({
      nick: new FormControl(perfilData ? perfilData.nick_user : '', [Validators.minLength(0), Validators.maxLength(25), Validators.pattern(this.textPattern)]),
      passw: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(this.textPattern)]),
      name: new FormControl(perfilData ? perfilData.name_user : '', [Validators.minLength(0), Validators.maxLength(25), Validators.pattern(this.textPattern)]),
      surname: new FormControl(perfilData ? perfilData.surname_user : '', [Validators.minLength(0), Validators.maxLength(50), Validators.pattern(this.textPattern)]),
      birthdate: new FormControl(perfilData ? this.datePipe.transform(perfilData.birthdate_user, 'yyyy-MM-dd') : ''),
      email: new FormControl(perfilData ? perfilData.email_user : '', [Validators.minLength(0), Validators.maxLength(50), Validators.pattern(this.emailPattern)]),
      description: new FormControl(perfilData ? perfilData.description_user : '', [Validators.minLength(0), Validators.maxLength(200)]),
      newpassw: new FormControl('', [Validators.minLength(0), Validators.maxLength(25), Validators.pattern(this.textPattern)]),
      repnewpassw: new FormControl('', [Validators.minLength(0), Validators.maxLength(25), Validators.pattern(this.textPattern)])
    });
  }

  onResetForm(): void {
    this.contactForm.reset();
  }

  inputChange(): boolean {
    if (this.perfilResult && this.contactForm) {
      if (this.contactForm.value.passw != '' && this.contactForm.get('passw').status == 'VALID') {
        if (this.contactForm.value.name != this.perfilResult.name_user && this.contactForm.get('name').status == 'VALID') {
          return true;
        }
        else if (this.contactForm.value.email != this.perfilResult.email_user && this.contactForm.get('email').status == 'VALID') {
          return true;
        }
        else if (this.contactForm.value.surname != this.perfilResult.surname_user && this.contactForm.get('surname').status == 'VALID') {
          return true;
        }
        else if (this.contactForm.value.birthdate != this.datePipe.transform(this.perfilResult.birthdate_user, 'yyyy-MM-dd') && this.contactForm.get('birthdate').status == 'VALID') {
          return true;
        }
        else if (this.contactForm.value.description != this.perfilResult.description_user && this.contactForm.get('description').status == 'VALID') {
          return true;
        }
        else if (this.contactForm.value.newpassw == this.contactForm.value.repnewpassw
          && this.contactForm.value.newpassw != ''  && this.contactForm.value.repnewpassw != ''
          && this.contactForm.get('repnewpassw').status == 'VALID'
          && this.contactForm.get('newpassw').status == 'VALID'
          ) {
          return true;
        } else {
          return false;
        }
      } else {
        return null
      }
    } else {
      return null
    }
  }

  showConfigured() {
    // SnackBar configuration
    const configuration: OSnackBarConfig = {
      action: 'Done',
      milliseconds: 5000,
      icon: 'check_circle',
      iconPosition: 'left'
    };
  }

  onSaveForm(): void {
    if (this.contactForm.valid ) {
      const perfiUpdate: IUserModel = <IUserModel>{
        'password_user' : this.contactForm.value.passw 
      }
      if (this.contactForm.value.name != this.perfilResult.name_user && this.contactForm.get('name').status == 'VALID') {
        perfiUpdate['name_user'] = this.contactForm.value.name;
      }
      if (this.contactForm.value.email != this.perfilResult.email_user && this.contactForm.get('email').status == 'VALID') {
        perfiUpdate['email_user'] = this.contactForm.value.email;
      }
      if (this.contactForm.value.surname != this.perfilResult.surname_user && this.contactForm.get('surname').status == 'VALID') {
        perfiUpdate['surname_user'] = this.contactForm.value.surname;
      }
      if (this.contactForm.value.birthdate != this.datePipe.transform(this.perfilResult.birthdate_user, 'yyyy-MM-dd') && this.contactForm.get('birthdate').status == 'VALID') {
        perfiUpdate['birthdate_user'] = this.contactForm.value.birthdate;
      }
      if (this.contactForm.value.description != this.perfilResult.description_user && this.contactForm.get('description').status == 'VALID') {
        perfiUpdate['description_user'] = this.contactForm.value.description;
      }
      if (this.contactForm.value.newpassw == this.contactForm.value.repnewpassw
        && this.contactForm.value.newpassw != ''  && this.contactForm.value.repnewpassw != ''
        && this.contactForm.get('repnewpassw').status == 'VALID'
        && this.contactForm.get('newpassw').status == 'VALID'
        ) {
          perfiUpdate['new_passw'] = this.contactForm.value.newpassw;
        }
      console.log('perfiUpdate', perfiUpdate);
      this.perfilService.setUserData(
        perfiUpdate.password_user, perfiUpdate.name_user, perfiUpdate.surname_user,
        perfiUpdate.email_user, perfiUpdate.birthdate_user, perfiUpdate.description_user
        , perfiUpdate.new_passw)
        .subscribe(
          (userData: any) => {
            console.log('recibo todo ', userData);
            if (userData['data']) {
              console.log('recibo la parte de data ', userData['data']);
              console.log('nº results ', userData['data'].length);
              if (userData['code'] == 0) {
                this.alert = 1;
                this.snackBarService.open('Snackbar text', {
                  action: 'Done',
                  milliseconds: 5000,
                  icon: 'check_circle',
                  iconPosition: 'left'
                });
                this.contactForm.reset;
                this.ngOnStartForm();
              } else if (userData['code'] == 1) {
                this.alert = 0;
                this.snackBarService.open('Snackbar text', {
                  action: 'Done',
                  milliseconds: 5000,
                  icon: 'check_circle',
                  iconPosition: 'left'
                });
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
  cargarForm(): boolean {
    if (this.contactForm && this.perfilResult) {
      console.log('load form ', this.contactForm);
      console.log('load perfilData ', this.perfilResult);
      return true;
    }
    return false;
  }


}
