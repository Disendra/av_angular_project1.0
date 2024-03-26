import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentBlogPostsComponent } from './recent-blog-posts.component';

describe('RecentBlogPostsComponent', () => {
  let component: RecentBlogPostsComponent;
  let fixture: ComponentFixture<RecentBlogPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecentBlogPostsComponent]
    });
    fixture = TestBed.createComponent(RecentBlogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
