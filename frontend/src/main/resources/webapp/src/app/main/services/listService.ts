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
export class ListService extends OntimizeEEService {

    buildHeaders () {
        const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
        return new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + myData.session.id
        });
    }


    insertList(name :string,description?: string ) {
         const url = CONFIG.apiEndpoint + '/' + 'songlists/songlist';
         var dataObject = {}
         if (name ) dataObject['name_songlist']=name ;
         if (description ) dataObject['description_songlist']=description ;
         var options = {
            headers: this.buildHeaders()
         };
       var body = JSON.stringify({
        data: dataObject,
        sqltypes: {
            'name_songlist': 12,
            'description_songlist': 12,
            'id_user': 4,
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

     addSong(id_song : number , name_songlist: string ){
        const url = CONFIG.apiEndpoint + '/' + 'list_songlists/list_songlist';
        var dataObject = {}
        if (name_songlist ) dataObject['name_songlist']=name_songlist ;
        if (id_song ) dataObject['id_song']=id_song ;
        var options = {
           headers: this.buildHeaders()
        };
      var body = JSON.stringify({
       data: dataObject,
       sqltypes: {
           'id_list_songlist': 4,
           'id_songlist': 4,
           'id_song': 4,
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