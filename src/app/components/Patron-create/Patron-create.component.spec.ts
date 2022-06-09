import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatronCreateComponent } from './Patron-create.component';

describe('PatronCreateComponent', () => {
  let component: PatronCreateComponent;
  let fixture: ComponentFixture<PatronCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatronCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatronCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
