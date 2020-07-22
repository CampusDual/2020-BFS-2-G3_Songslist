import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface IUserModel {
      id_user: number ;
      nick_user: string ;
      name_user?: string,
      surname_user?: string,
      email_user?: string,
      password_user: string,
      birthdate_user?: any,
      description_user? : string,
      new_passw? : string
   }
  
