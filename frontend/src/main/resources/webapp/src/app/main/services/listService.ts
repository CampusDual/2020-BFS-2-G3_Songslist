import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG } from 'app/app.config';
import { OntimizeEEService, Observable, Subject } from 'ontimize-web-ngx';
import { share } from 'rxjs/operators';

@Injectable(
     {    
     providedIn: 'root'
     }
)
export class ListService extends OntimizeEEService {
    private subjectRefresh = new Subject<any>();
    private subjectMessage = new Subject<any>();
    private subjectAction = new Subject<any>();

    sendAction(message: string) {
        this.subjectAction.next({ action: message });
    }
    sendRefresh(message: string) {
        this.subjectRefresh.next({ refresh: message });
    }
    sendMessage(message: string) {
        this.subjectMessage.next({ text: message });
    }

    clearMessages() {
        this.subjectMessage.next();
    }
    clearActions() {
        this.subjectAction.next();
    }
    clearRefresh() {
        this.subjectRefresh.next();
    }

    getMessage(): Observable<any> {
        return this.subjectMessage.asObservable();
    }
    getRefresh(): Observable<any> {
        return this.subjectRefresh.asObservable();
    }
    getAction(): Observable<any> {
        return this.subjectAction.asObservable();
    }

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
     deleteSong(id_song : number , name_songlist: string ){
        const url = CONFIG.apiEndpoint + '/' + 'list_songlists/delSong';
        var dataObject = {}
        if (name_songlist ) dataObject['name_songlist']=name_songlist ;
        if (id_song ) dataObject['id_song']=id_song ;
        var options = {
           headers: this.buildHeaders()
        };
      var body = JSON.stringify({
        filter: dataObject

   });
        var self = this;
        var dataObservable = new Observable(function (_innerObserver) {

            self.httpClient.post(url,body, options).subscribe(function (resp) {
                self.parseSuccessfulQueryResponse(resp, _innerObserver);

            }, function (error) {
                self.parseUnsuccessfulQueryResponse(error, _innerObserver);
            }, function () { return _innerObserver.complete(); });
        });
        return dataObservable.pipe(share());
    }
    deleteList(id_songlist: number ){
        const url = CONFIG.apiEndpoint + '/' + 'list_songlists/delSonglist';
         var dataObject = {}
         if (id_songlist ) dataObject['id_songlist']=id_songlist ;
        var options = {
           headers: this.buildHeaders()
        };
      var body = JSON.stringify({
         filter: dataObject

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


    
    getListIncludingSong(songId : number) {
        const url = CONFIG.apiEndpoint + '/' + 'songlists/songlist/search';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            filter: {
                id_song: songId,
                "user": "owner"
                 },
            columns: ['name_songlist'],
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

    getSonglistOwnerId() {
        const url = CONFIG.apiEndpoint + '/' + 'songlists/songlist/search';
        var options = {
            headers: this.buildHeaders()
        };
        var body = JSON.stringify({
            filter: {
                "user": "owner"
                 },
            columns: ['id_songlist'],
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