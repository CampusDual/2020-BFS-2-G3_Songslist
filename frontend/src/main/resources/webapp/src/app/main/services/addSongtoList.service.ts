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
export class addSongtoListService extends OntimizeEEService {

    buildHeaders () {
        const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
        return new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + myData.session.id
        });
    }
    openForm(id:number){
        
    }


    setSongList(id:number) {
    //     const url = CONFIG.apiEndpoint + '/' + 'songs/song/search';
    //     var options = {
    //         headers: this.buildHeaders()
    //     };
    //     var body = JSON.stringify({
    //         filter: {
    //             id_song: id
    //              },
    //         columns: ['id_song', 'name_song', 'id_album', 'name_album', 'year_album', 'id_artist', 'name_artist', 'id_genre', 'name_genre', 'description_song'],
    //         sqltypes: {
    //             'id_song': 4,
    //             'name_song': 12,
    //             'id_album': 4,
    //             'name_album': 12,
    //             'year_album': 93,
    //             'id_artist': 4,
    //             'name_artist': 12,
    //             'id_genre': 4,
    //             'name_genre': 12,
    //             'description_song': 12
    //         }
    //     });
    //     var self = this;
    //     var dataObservable = new Observable(function (_innerObserver) {

    //         self.httpClient.post(url, body, options).subscribe(function (resp) {
    //             self.parseSuccessfulQueryResponse(resp, _innerObserver);

    //         }, function (error) {
    //             self.parseUnsuccessfulQueryResponse(error, _innerObserver);
    //         }, function () { return _innerObserver.complete(); });
    //     });
    //     return dataObservable.pipe(share());
     }
}