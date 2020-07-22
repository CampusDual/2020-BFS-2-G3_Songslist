import { Component, OnInit, Inject, NgZone, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserModel } from 'app/shared/models/iuser.model'
import { Observable } from 'rxjs';
import { IAuthService } from 'ontimize-web-ngx';
import { DialogService, ODialogConfig } from 'ontimize-web-ngx';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from 'app/main/services/registerService';
import { viewAttached, getViewData } from '@angular/core/src/render3/instructions';
import { OSnackBarConfig, SnackBarService } from 'ontimize-web-ngx';
import { window } from 'rxjs/operators';

@Component({
  selector: 'register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public userResult: IUserModel = null;
  public registerForm: FormGroup = null;
  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private user: IUserModel = {
    id_user: 100,
    nick_user: "",
    password_user: ''
  };
  public match: boolean = false;
  public minLenght: boolean = true;
  public writeSomething: boolean = false;
  constructor(
    private registerService: RegisterService,
    protected dialogService: DialogService,
    private snackBarService: SnackBarService,) { }
  ngOnInit() {
    this.registerForm = this.createForm();
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get nick() { return this.registerForm.get('nick'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPass() { return this.registerForm.get('confirmPass'); }
  get surname() { return this.registerForm.get('surname'); }
  get birthdate() { return this.registerForm.get('birthdate'); }
  get description() { return this.registerForm.get('description'); }

  createForm() {
    console.log('method : createForm')
    return new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.maxLength(25)]),
      email: new FormControl('', [Validators.minLength(3), Validators.pattern(this.emailPattern)]),
      nick: new FormControl('', [Validators.minLength(3), Validators.maxLength(25)]),
      password: new FormControl('', [Validators.minLength(6), Validators.maxLength(25)]),
      confirmPass: new FormControl(),
      surname: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
      birthdate: new FormControl(''),
      description: new FormControl('', [Validators.minLength(0), Validators.maxLength(200)])

    });
  }
  onResetForm(): void {
    this.registerForm.reset();
  }

  onRegisterUser(): void {
    let snackBarService: SnackBarService;
    console.log('pulsoboton')
    console.log('PARAMETROS: ', this.registerForm.value)
    new Date(this.registerForm.value.birthdate).getTime() / 1000
    if (this.registerForm.valid) {
      this.user.nick_user = this.registerForm.value.nick;
      this.user.password_user = this.registerForm.value.password;
      this.user.name_user = this.registerForm.value.name;
      this.user.surname_user = this.registerForm.value.surname;
      this.user.email_user = this.registerForm.value.email;
      this.user.birthdate_user = Date.parse(this.registerForm.value.birthdate)/1000;
    }
    this.registerService.registerUser(this.user).subscribe(
      (userData: any) => {
        if (userData['data']) {
          if (userData['code'] == 0) {
            this.onAssignRole(userData['data'].id_user);
            this.onAssignPreference(this.user.nick_user);
            this.registerForm = this.createForm();
            this.snackBarService.open('User has been created', {
              action: 'Done',
              milliseconds: 5000,
              icon: 'check_circle',
              iconPosition: 'left'
            });
          } else{
            this.snackBarService.open
            (

              'Warning! User hasn´t been created. Choose another nick.',
              {
                action: 'Done',
                milliseconds: 5000,
                icon: 'check_circle',
                iconPosition: 'left'
              }
            );
          }

        }

      },
      err => {
        console.error(err);
        this.snackBarService.open            (

              'Warning! User hasn´t been created. Choose another nick.',
              {
                action: 'Done',
                milliseconds: 5000,
                icon: 'check_circle',
                iconPosition: 'left'
              }
            );
      }


    );

  }

  onAssignRole(id: number) {
    console.log('USERID = ', id)
    this.registerService.assignRole(id).subscribe(
      (userData: any) => {
        if (userData['data']) {
          this.registerService.assignTokenPreference(this.user.nick_user).subscribe;
          if (userData['data'].length > 0) {
            this.userResult = userData['data'][0];
            this.registerForm = this.createForm();
            return this.userResult;
          } else {
            this.userResult = null;
          }
        }
      },
      err => {
        console.error(err);
      }
    );
  }
  onAssignPreference(nick: string) {

    console.log('USERNICK = ', nick)
    this.registerService.assignTokenPreference(nick).subscribe(
      (userData: any) => {
        if (userData['data']) {
          if (userData['data'].length > 0) {
            this.userResult = userData['data'][0];
            this.registerForm = this.createForm();
            return this.userResult;
          } else {
            this.userResult = null;
          }
        }
      },
      err => {

        console.error(err);
      }
    );
  }
  checkPasswords() {
    let stringpass = this.registerForm.value.password;
    let stringrepeat = this.registerForm.value.confirmPass;
    let pass: number = (this.registerForm.value.password) ? this.registerForm.value.password.length : 0;
    let repeatpass: number = (this.registerForm.value.confirmPass) ? this.registerForm.value.confirmPass.length : 0;
    this.writeSomething = repeatpass > 0 ? true : false;
    if (pass > 0) {
      this.minLenght = pass < 6 ? false : true;
      if (repeatpass > 0) {
        let stringpass = this.registerForm.value.password;
        let stringrepeat = this.registerForm.value.confirmPass;
        this.match = (stringpass > stringrepeat || stringpass < stringrepeat) ? false : true;
      }
    } else { this.minLenght = true }
  }
}

