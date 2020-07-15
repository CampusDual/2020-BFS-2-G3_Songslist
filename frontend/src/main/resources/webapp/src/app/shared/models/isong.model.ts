
export interface ISongModel {
  name_song: string;
    id_artist: number;
    name_artist: string;
    id_song: number;
    id_genre: number;
    id_album: number;
    img_album:number;
    name_genre: string;
    name_album: string;
    //img_song : string;
    description_song?: string;
    year_album?: Date;
 }
