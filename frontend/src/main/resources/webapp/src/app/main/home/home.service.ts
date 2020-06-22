import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'app/app.config';
import { ISongModule } from 'app/shared/models/isong.model';
import { OntimizeEEService, Observable } from 'ontimize-web-ngx';
import { share } from 'rxjs/operators';

@Injectable(
     {    // no hace falta declararlo en los modulos
     providedIn: 'root'
     }
)
export class HomeService extends OntimizeEEService {

    getSongData(radioSelected: string , searchText: string) {
        const url = CONFIG.apiEndpoint + '/' + 'songs/searchSong';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            filter: {
                'NAME': searchText,
                'OPTION': radioSelected
                 },
            columns: ['id_song', 'name_song', 'id_artist', 'name_artist', 'id_genre', 'name_genre', 'id_album', 'name_album'],
        });
        // Opción 1 - usando métodos de ontimize para parsear la respuesta
        var self = this;
        var dataObservable = new Observable(function (_innerObserver) {
            self.httpClient.post(url, body, options).subscribe(function (resp) {
                self.parseSuccessfulQueryResponse(resp, _innerObserver);
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

