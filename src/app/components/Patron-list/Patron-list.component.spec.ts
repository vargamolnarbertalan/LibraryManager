import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronListComponent } from './Patron-list.component';

describe('PatronListComponent', () => {
  let component: PatronListComponent;
  let fixture: ComponentFixture<PatronListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatronListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
