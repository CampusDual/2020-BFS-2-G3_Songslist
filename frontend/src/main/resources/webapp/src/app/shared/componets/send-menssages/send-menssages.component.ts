import { Component, OnInit, Input } from '@angular/core';
import { RefreshComponetService } from 'app/main/services/refresh-componet.service';

@Component({
  selector: 'app-send-menssages',
  templateUrl: './send-menssages.component.html',
  styleUrls: ['./send-menssages.component.scss']
})
export class SendMenssagesComponent implements OnInit {
  @Input("MSM") msm :string;
  inputText : string ;

  constructor(private refreshComponetService: RefreshComponetService) { }

  sendClick(){
    if (this.inputText){
      this.refreshComponetService.sendMessage(this.inputText);
    }
  }

  sendMessage(msg : string): void {
    console.log('clic on send');
    console.log ('click send msn',this.msm);
      // send message to subscribers via observable subject
      this.refreshComponetService.sendMessage(msg);
  }

  clearMessages(): void {
      // clear messages
      this.refreshComponetService.clearMessages();
  }

  ngOnInit() {
    console.log (' init send msn',this.msm);
    this.sendMessage(this.msm);
  }
  onItemChange($event) {
    this.inputText = $event;
  }
}
