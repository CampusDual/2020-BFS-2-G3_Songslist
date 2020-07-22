
export interface ISonglistDetailModel {
    id_songlist : number;
    name_songlist : string;
    id_song : number;
    name_song_list : string;
    id_genre : number;
    name_genre : string;
    id_album : number;
    name_album : string;
    year_album ?: Date;
    img_album ?: number;
    id_artist : number;
    name_artist ?: string;
    description_song ?: string;
    image?: number;
    description_songlist?: string;
    nick_user?:string;
    owner?:boolean;

 }
