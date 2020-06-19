import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from 'app/app.config';

@Injectable(
     {    // no hace falta declararlo en los modulos
     providedIn: 'root'
     }
)
export class HomeService {
    constructor(private http: HttpClient) {
    }
    getStaticData(radioSearch: string, inputText: string) {
        let url: string = CONFIG.apiEndpoint + '/songs/searchSong';
        // servicio rest
        let postData = {
            'filter': [
                { 'NAME': radioSearch ,
                 'OPTION': inputText }
            ],
            'columns': ['id_song', 'name_song', 'id_artist', 'name_artist', 'id_genre', 'name_genre', 'id_album', 'name_album']
        };
        // cargar servicio res
        return this.http.post(url, postData);
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

}