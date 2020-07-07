import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from 'app/app.config';
import { OntimizeEEService, Observable } from 'ontimize-web-ngx';
import { share } from 'rxjs/operators';
import { IUserModel } from 'app/shared/models/iuser.model';

@Injectable(
     {    
     providedIn: 'root'
     }
)
export class RegisterService extends OntimizeEEService {

    buildHeaders () {
        const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
        return new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + myData.session.id
        });
    }

    registerUser(  user: IUserModel ) {
        let bd = new Date(user.birthdate_user).getTime() / 1000;
        const url = CONFIG.apiEndpoint + '/' + 'users/user';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            data: {
                "nick_user": user.nick_user,
                "name_user": user.name_user,
                "surname_user": user.surname_user,
                "email_user": user.email_user,
                "password_user": user.password_user,
                "birthdate_user": bd,
                "description": user.description_user
            
            },
            sqltypes: {
                'id_user': 4,
                'nick_user': 12,
                'name_user': 12,
                'surname_user': 12,
                'email_user': 12,
                'password': 12,
                'birthdate_user': 93,
                'description': 12    
                
            }
        });
        var self = this;
        var dataObservable = new Observable(function (_innerObserver) {
            self.httpClient.post(url, body, options).subscribe(function (resp) {
                self.parseSuccessfulQueryResponse(resp, _innerObserver);
                console.log('RESP = ', resp)
            }, function (error) {
                self.parseUnsuccessfulQueryResponse(error, _innerObserver);
                console.log('ERROR = ', error)
            }, function () { return _innerObserver.complete(); });
        });
        console.log('USER3 = ',  user.nick_user);
        console.log('PASS3 = ',  user.password_user);
        return dataObservable.pipe(share());
    }
}


