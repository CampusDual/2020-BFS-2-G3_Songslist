import { Component, OnInit, Inject, NgZone, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserModel } from 'app/shared/models/iuser.model'
import { Observable } from 'rxjs';

import { IAuthService } from 'ontimize-web-ngx';
import { DialogService, ODialogConfig } from 'ontimize-web-ngx';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from 'app/main/services/registerService';

@Component({
    selector: 'register',
    styleUrls: ['./register.component.scss'],
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
    public userResult: IUserModel = null;
    public contactForm: FormGroup = null;
    private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private user: IUserModel = {
        id_user : 100,
        nick_user : "",
        password_user : ''
    };
    constructor(private registerService: RegisterService, protected dialogService: DialogService) { }


    ngOnInit() {
        this.contactForm = this.createForm();
    }    

    get name() { return this.contactForm.get('name'); }
    get email() { return this.contactForm.get('email'); }
    get nick() { return this.contactForm.get('nick'); }
    get password() { return this.contactForm.get('password'); }
    get surname() { return this.contactForm.get('surname'); }
    get birthdate() { return this.contactForm.get('birthdate'); }
    get description() { return this.contactForm.get('description'); }

    createForm() {
        console.log('method : createForm')
        return new FormGroup({
            name: new FormControl('', [Validators.minLength(3), Validators.maxLength(25)]),
            email: new FormControl('', [Validators.minLength(3), Validators.pattern(this.emailPattern)]),
            nick: new FormControl('', [Validators.minLength(3), Validators.maxLength(25)]),
            pass: new FormControl('', [Validators.minLength(3), Validators.maxLength(25)]),
            surname: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
            birthdate: new FormControl(''),
            description: new FormControl('', [Validators.minLength(0), Validators.maxLength(200)])

        });
    }
    onResetForm(): void {
        this.contactForm.reset();
    }
    onRegisterUser(): void {
        
        console.log('pulsoboton')
        console.log('PARAMETROS: ', this.contactForm.value)
        new Date('2012-02-26').getTime() / 1000
        if (this.contactForm.valid) {
            this.user.nick_user = this.contactForm.value.nick;
            this.user.password_user = this.contactForm.value.pass;
            this.user.name_user = this.contactForm.value.name;
            this.user.surname_user = this.contactForm.value.surname;
            this.user.email_user = this.contactForm.value.email;
            this.user.birthdate_user = this.contactForm.value.birthdate;
        }


        this.registerService.registerUser(this.user).subscribe(
            (userData: any) => {
              if (userData['data']) {
                if (userData['data'].length > 0) {
                  this.userResult = userData['data'][0];
                  this.contactForm=this.createForm(); 
                  return this.userResult;
                } else {
                  this.userResult = null;
                }
              }
            },
            err => console.error(err)
          ); 
        console.log('PASS   ', this.contactForm.value.pass);
        this.onResetForm();
    }
}

