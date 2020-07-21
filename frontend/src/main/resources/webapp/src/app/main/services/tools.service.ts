import { Injectable } from '@angular/core';
import { CONFIG } from 'app/app.config';
export const myData = JSON.parse(localStorage.getItem(CONFIG.uuid));
export const user = myData.session.user;
@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  getNickUser(): string{
    return user;

  }
}
