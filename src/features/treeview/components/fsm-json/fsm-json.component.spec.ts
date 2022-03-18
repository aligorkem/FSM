import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmJsonComponent } from './fsm-json.component';

describe('FsmJsonComponent', () => {
  let component: FsmJsonComponent;
  let fixture: ComponentFixture<FsmJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FsmJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
