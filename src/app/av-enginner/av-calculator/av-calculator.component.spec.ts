import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvCalculatorComponent } from './av-calculator.component';

describe('AvCalculatorComponent', () => {
  let component: AvCalculatorComponent;
  let fixture: ComponentFixture<AvCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
