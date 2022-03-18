import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FSMTreeviewComponent } from './fsm-treeview.component';

describe('FsmTreeviewComponent', () => {
  let component: FSMTreeviewComponent;
  let fixture: ComponentFixture<FSMTreeviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FSMTreeviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FSMTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
