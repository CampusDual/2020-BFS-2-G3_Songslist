import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RefreshComponetService } from 'app/main/services/refresh-componet.service';

@Component({
  selector: 'app-receive-menssages',
  templateUrl: './receive-menssages.component.html',
  styleUrls: ['./receive-menssages.component.scss']
})
export class ReceiveMenssagesComponent implements OnInit , OnDestroy  {
  messages: any[] = [];
  subscription: Subscription;

  constructor(private refreshComponetService: RefreshComponetService) {
      // subscribe to home component messages
      this.subscription = this.refreshComponetService.getMessage().subscribe(message => {
        if (message) {
          this.messages.push(message);
          console.log('receive-menssages',this.messages)
        } else {
          // clear messages when empty message received
          this.messages = [];
        }
      });
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
