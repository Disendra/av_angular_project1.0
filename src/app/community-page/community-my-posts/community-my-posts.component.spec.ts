import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityMyPostsComponent } from './community-my-posts.component';

describe('CommunityMyPostsComponent', () => {
  let component: CommunityMyPostsComponent;
  let fixture: ComponentFixture<CommunityMyPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityMyPostsComponent]
    });
    fixture = TestBed.createComponent(CommunityMyPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
