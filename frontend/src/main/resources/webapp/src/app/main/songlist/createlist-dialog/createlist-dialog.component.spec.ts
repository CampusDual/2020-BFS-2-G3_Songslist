import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatelistDialogComponent } from './createlist-dialog.component';

describe('CreatelistDialogComponent', () => {
  let component: CreatelistDialogComponent;
  let fixture: ComponentFixture<CreatelistDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatelistDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatelistDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
