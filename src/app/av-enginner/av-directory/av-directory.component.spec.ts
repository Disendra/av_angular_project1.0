import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvDirectoryComponent } from './av-directory.component';

describe('AvDirectoryComponent', () => {
  let component: AvDirectoryComponent;
  let fixture: ComponentFixture<AvDirectoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvDirectoryComponent]
    });
    fixture = TestBed.createComponent(AvDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
