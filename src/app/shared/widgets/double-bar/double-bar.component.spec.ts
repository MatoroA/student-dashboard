import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleBarComponent } from './double-bar.component';

describe('DoubleBarComponent', () => {
  let component: DoubleBarComponent;
  let fixture: ComponentFixture<DoubleBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
