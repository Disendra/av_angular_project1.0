import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvBtuComponent } from './av-btu.component';

describe('AvBtuComponent', () => {
  let component: AvBtuComponent;
  let fixture: ComponentFixture<AvBtuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvBtuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvBtuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
