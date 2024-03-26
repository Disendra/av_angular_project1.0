import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvSimulatorComponent } from './av-simulator.component';

describe('AvSimulatorComponent', () => {
  let component: AvSimulatorComponent;
  let fixture: ComponentFixture<AvSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
