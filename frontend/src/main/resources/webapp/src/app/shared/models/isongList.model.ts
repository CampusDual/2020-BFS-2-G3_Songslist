import { ISongModel } from "./isong.model";

export interface ISongListModel {
      id_songlist: number;
      nick_user: string;
      name_songlist: string;
      description_songlist ?: string;  
      id_user? : number;
      checked? : boolean;
      image? : number;
      numSongs? : number;
   }
  