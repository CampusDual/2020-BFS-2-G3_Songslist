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
export class ArtistService extends OntimizeEEService {
    buildHeaders () {
        const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
        return new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + myData.session.id
        });
    }
    getArtistData(id:number) {
        const url = CONFIG.apiEndpoint + '/' + 'artists/artist/search';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            filter: {
                id_artist: id
                 },
            columns: ['id_artist', 'name_artist', 'description_artist', 'img_artist'],
            sqltypes: {
                'id_artist': 4,
                'name_artist': 12,
                'description_artist': 12, 
                'img_artist': 1111
            }
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

    getArtistAlbumlist(id: number) {
        const url = CONFIG.apiEndpoint + '/' + 'albums/album/search';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            filter: {
                'id_artist': id,
                 },
            columns: ['id_artist', 'name_artist', 'id_genre', 'name_genre', 'id_album', 'name_album', 'year_album', 'description_album', 'img_album'],
            sqltypes: {
                'id_album': 4,
                'name_album': 12,
                'id_artist': 4,
                'name_artist': 12,
                'id_genre': 4,
                'name_genre': 12,
                'year_album': 91,
                'description_album': 12,
                'img_album': 2004
            }
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