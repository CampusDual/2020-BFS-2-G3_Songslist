import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from 'app/app.config';
import { ISongModel } from 'app/shared/models/isong.model';
import { OntimizeEEService, Observable } from 'ontimize-web-ngx';
import { share } from 'rxjs/operators';

@Injectable(
     {    // no hace falta declararlo en los modulos
     providedIn: 'root'
     }
)
export class HomeService extends OntimizeEEService {
    // buildHeaders(){

    // }

    buildHeaders () {
        console.log(this._config);
        // To retrieve data from localstorage
        const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
        console.log (myData);
        console.log (myData.session);
        console.log (myData.session.id);
        return new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + myData.session.id
        });
    }

    getSongData(radioSelected: string , searchText: string) {
        const url = CONFIG.apiEndpoint + '/' + 'public/searchSong';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            filter: {
                'NAME': searchText,
                'OPTION': radioSelected
                 },
            columns: ['id_song', 'name_song', 'id_artist', 'name_artist', 'id_genre', 'name_genre', 'id_album', 'name_album', 'img_album'],
        });
        // Opción 1 - usando métodos de ontimize para parsear la respuesta
        var self = this;
        var dataObservable = new Observable(function (_innerObserver) {
            console.log(url);
            console.log(body);
            console.log(options);
            self.httpClient.post(url, body, options).subscribe(function (resp) {
                self.parseSuccessfulQueryResponse(resp, _innerObserver);
                console.log(url);
                console.log(body);
                console.log(options);
                console.log(resp);
            }, function (error) {
                self.parseUnsuccessfulQueryResponse(error, _innerObserver);
            }, function () { return _innerObserver.complete(); });
        });
        return dataObservable.pipe(share());

        // lo que necesito es la varaiable resp

        // Opción 2- Sin controlar la respuesta
        // return this.httpClient.post(url, body, options);
    }
}
    // POST REQUEST
    // ============================================
    // POST  localhost:33334/songs/searchSong
    // ----------------------------------------
    // {
    //     'filter': {
    //      'NAME': 'ad',
    //      'OPTION': 'song'
    //     },
    //     'columns': ['id_song','name_song','id_artist','name_artist','id_genre','name_genre','id_album','name_album']
    // }
    // ============================================

