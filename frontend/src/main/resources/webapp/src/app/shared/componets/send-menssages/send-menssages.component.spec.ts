import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMenssagesComponent } from './send-menssages.component';

describe('SendMenssagesComponent', () => {
  let component: SendMenssagesComponent;
  let fixture: ComponentFixture<SendMenssagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMenssagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMenssagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
