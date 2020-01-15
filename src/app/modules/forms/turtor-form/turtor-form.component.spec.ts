import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurtorFormComponent } from './turtor-form.component';

describe('TurtorFormComponent', () => {
  let component: TurtorFormComponent;
  let fixture: ComponentFixture<TurtorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurtorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurtorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
