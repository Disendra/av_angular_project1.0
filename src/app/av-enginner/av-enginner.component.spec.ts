import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvEnginnerComponent } from './av-enginner.component';

describe('AvEnginnerComponent', () => {
  let component: AvEnginnerComponent;
  let fixture: ComponentFixture<AvEnginnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvEnginnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvEnginnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
