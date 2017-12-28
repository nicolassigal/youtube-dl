import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YtubeComponent } from './ytube.component';

describe('YtubeComponent', () => {
  let component: YtubeComponent;
  let fixture: ComponentFixture<YtubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YtubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YtubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
