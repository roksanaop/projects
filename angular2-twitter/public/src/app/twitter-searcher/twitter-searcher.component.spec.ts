import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitterSearcherComponent } from './twitter-searcher.component';

describe('TwitterSearcherComponent', () => {
  let component: TwitterSearcherComponent;
  let fixture: ComponentFixture<TwitterSearcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitterSearcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
