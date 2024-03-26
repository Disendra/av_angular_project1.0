import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvAboutComponent } from './av-about.component';

describe('AvAboutComponent', () => {
  let component: AvAboutComponent;
  let fixture: ComponentFixture<AvAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvAboutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
