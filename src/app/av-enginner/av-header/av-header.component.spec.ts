import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvHeaderComponent } from './av-header.component';

describe('AvHeaderComponent', () => {
  let component: AvHeaderComponent;
  let fixture: ComponentFixture<AvHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
