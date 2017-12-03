import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetGraphsComponent } from './tweet-graphs.component';

describe('TweetGraphsComponent', () => {
  let component: TweetGraphsComponent;
  let fixture: ComponentFixture<TweetGraphsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetGraphsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
