import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveMenssagesComponent } from './receive-menssages.component';

describe('ReceiveMenssagesComponent', () => {
  let component: ReceiveMenssagesComponent;
  let fixture: ComponentFixture<ReceiveMenssagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveMenssagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveMenssagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
