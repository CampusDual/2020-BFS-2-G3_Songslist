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
         const url = CONFIG.apiEndpoint + '/' + 'songs/song/search';
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
}