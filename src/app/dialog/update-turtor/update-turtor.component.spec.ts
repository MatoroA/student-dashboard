import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTurtorComponent } from './update-turtor.component';

describe('UpdateTurtorComponent', () => {
  let component: UpdateTurtorComponent;
  let fixture: ComponentFixture<UpdateTurtorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTurtorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTurtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
