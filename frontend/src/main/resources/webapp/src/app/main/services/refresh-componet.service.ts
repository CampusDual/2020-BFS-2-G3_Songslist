import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshComponetService {
  private subject = new Subject<any>();

  sendMessage(message: string) {
      this.subject.next({ text: message });
  }

  clearMessages() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
  constructor() { }
}
