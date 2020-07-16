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
export class SonglistService extends OntimizeEEService {
    private nick_user: string;

    buildHeaders () {
        const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
        this.nick_user = myData.session.user;
        return new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + myData.session.id
        });
    }
    getAllSonglist() {
        const url = CONFIG.apiEndpoint + '/' + 'songlists/searchSonglist';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            filter: {
                USER: this.nick_user,
                SONGLIST: ''
                 },
            columns: ['id_songlist', 'nick_user', 'name_songlist', 'description_songlist'],
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
   
    getSongs(id:number) {
        const url = CONFIG.apiEndpoint + '/' + 'list_songlists/searchUserListSonglist';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            filter: {
                SONGLIST: id,
                    USER: this.nick_user                    
                     },
            columns: ['id_song', 'name_song', 'name_album', 'name_genre', 'year_album', 'description_song' ]
        });
        var self = this;
        console.log("en el servicio. self1", self);
        var dataObservable = new Observable(function (_innerObserver) {

            self.httpClient.post(url, body, options).subscribe(function (resp) {
                self.parseSuccessfulQueryResponse(resp, _innerObserver);

            }, function (error) {
                self.parseUnsuccessfulQueryResponse(error, _innerObserver);
            }, function () { return _innerObserver.complete(); });
        });
        return dataObservable.pipe(share());
    }
}