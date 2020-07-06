import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from 'app/app.config';
import { OntimizeEEService, Observable } from 'ontimize-web-ngx';
import { share } from 'rxjs/operators';

@Injectable(
     {    
     providedIn: 'root'
     }
)
export class PerfilService extends OntimizeEEService {
    user : string ;
    buildHeaders () {
        const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
        this.user = myData.session.user;
        return new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + myData.session.id
        });
    } 


    getUserData() {
        const url = CONFIG.apiEndpoint + '/' + 'users/user/search';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            filter: {
                'nick_user' : this.user
                 },
            columns: ['nick_user','name_user', 'surname_user', 'email_user', 'password_user', 'birthdate_user']
        });
        var self = this;
        var dataObservable = new Observable(function (_innerObserver) {

            self.httpClient.post(url, body, options).subscribe(function (resp) {
                self.parseSuccessfulQueryResponse(resp, _innerObserver);

            }, function (error) {
                self.parseUnsuccessfulQueryResponse(error, _innerObserver);
            }, function () { return _innerObserver.complete(); });
        });
        return dataObservable.pipe(share());
    }

    setUserData(name_user?: string , surname_user?: string, email_user?: string, birthdate_user? ) {
        const url = CONFIG.apiEndpoint + '/' + 'users/user';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            filter: {
               
                 },
                 data: {
                    'name_user': name_user,
                    'surname_user': surname_user,
                    'email_user': email_user,
                    'birthdate_user': birthdate_user
                },
            sqltypes: {
                'user_': 12,
                'name_user': 12,
                'surname_user': 12,
                'email_user': 12,
                'password': 12,
                'birthdate_user': 12
            }
        });
        var self = this;
        var dataObservable = new Observable(function (_innerObserver) {
            self.httpClient.put(url, body, options).subscribe(function (resp) {
                self.parseSuccessfulQueryResponse(resp, _innerObserver);
            }, function (error) {
                self.parseUnsuccessfulQueryResponse(error, _innerObserver);
            }, function () { return _innerObserver.complete(); });
        });
        return dataObservable.pipe(share());
    }

    saveMessage(data){
        console.log(data);
    } 

}