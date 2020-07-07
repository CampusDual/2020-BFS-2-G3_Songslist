import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from 'app/app.config';
import { OntimizeEEService, Observable } from 'ontimize-web-ngx';
import { share } from 'rxjs/operators';
import { IUserModel } from 'app/shared/models/iuser.model';
import { Data } from '@angular/router';

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
            columns: ['id_user','nick_user','name_user', 'surname_user', 'email_user', 'password_user', 'birthdate_user']
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

    setUserData( id_user: number,  name_user?: string , surname_user?: string, email_user?: string, birthdate_user? :Data, description_user? : string, password_user? :string ) {
        const url = CONFIG.apiEndpoint + '/' + 'users/user';
        var options = {
            headers: this.buildHeaders()
        };
        console.log ('Parametros',id_user,  name_user , surname_user , email_user , birthdate_user ,description_user, password_user)
        var dataObject = {}
        if (name_user ) dataObject['name_user']=name_user ;
        if (surname_user ) dataObject['surname_user']=surname_user ;
        if (email_user ) dataObject['email_user']=email_user ;
        if (birthdate_user ) dataObject['birthdate_user']=birthdate_user ;
        if (description_user ) dataObject['description_user']=description_user ;
        if (password_user ) dataObject['password_user']=password_user ;

        var body = JSON.stringify({
            filter: {
                'id_user': id_user
                 },
                 data: dataObject,
            sqltypes: {
                'id_user': 4,
                'nick_user': 12,
                'name_user': 12,
                'surname_user': 12,
                'email_user': 12,
                'password': 12,
                'birthdate_user': 93
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

    saveMessage(data : IUserModel ){
       
    } 

}