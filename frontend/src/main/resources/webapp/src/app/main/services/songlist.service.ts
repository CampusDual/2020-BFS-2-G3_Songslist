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

    /* 
    * Este método devuelve la lista con todas las listas de canciones del usuario logueado.
    * Se utiliza para el grid de My songlist
    */
    getAllSonglist(searchSonglist: String) {
        const url = CONFIG.apiEndpoint + '/' + 'songlists/searchSonglist';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            filter: {
                USER: this.nick_user,
                SONGLIST: searchSonglist
                 },
            columns: ['id_songlist', 'nick_user', 'name_songlist', 'description_songlist', 'image'],
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

    /* 
    * Este método devuelve la lista con todas las listas de canciones del usuario logueado.
    * Se utiliza para el grid de My songlist
    */
   getPublicSonglist(searchSonglist: String) {
    const url = CONFIG.apiEndpoint + '/' + 'songlists/searchSonglist';
    var options = {
        headers: this.buildHeaders()
    };
    var body = JSON.stringify({
        filter: {
            USER: '',
            SONGLIST: searchSonglist
             },
        columns: ['id_songlist', 'nick_user', 'name_songlist', 'description_songlist', 'image'],
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

   /*
   * Este método devuelve las canciones (con todos los datos de album, artista y género relacionados)
   */
   getSongs(id:number) {
        
        const url = CONFIG.apiEndpoint + '/' + 'list_songlists/searchListSonglist';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            filter: {
                SONGLIST: id,
                USER: '',      
                     },
            columns: ['id_song', 'name_song', 'name_album', 'name_artist', 'name_genre', 'year_album', 'description_song', 'img_album']
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
}