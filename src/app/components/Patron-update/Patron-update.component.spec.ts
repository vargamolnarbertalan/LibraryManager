import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronUpdateComponent } from './Patron-update.component';

describe('PatronUpdateComponent', () => {
  let component: PatronUpdateComponent;
  let fixture: ComponentFixture<PatronUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatronUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
