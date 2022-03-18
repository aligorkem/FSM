import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FSMContainerComponent } from './fsm-container.component';

describe('FsmHomeComponent', () => {
  let component: FSMContainerComponent;
  let fixture: ComponentFixture<FSMContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FSMContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FSMContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
