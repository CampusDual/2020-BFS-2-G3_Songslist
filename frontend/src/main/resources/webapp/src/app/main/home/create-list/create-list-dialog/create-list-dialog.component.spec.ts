import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListDialogComponent } from './create-list-dialog.component';

describe('CreateListDialogComponent', () => {
  let component: CreateListDialogComponent;
  let fixture: ComponentFixture<CreateListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
