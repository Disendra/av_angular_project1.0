import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvMyprofileComponent } from './av-myprofile.component';

describe('AvMyprofileComponent', () => {
  let component: AvMyprofileComponent;
  let fixture: ComponentFixture<AvMyprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvMyprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvMyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
