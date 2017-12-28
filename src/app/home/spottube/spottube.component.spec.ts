import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpottubeComponent } from './spottube.component';

describe('SpottubeComponent', () => {
  let component: SpottubeComponent;
  let fixture: ComponentFixture<SpottubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpottubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpottubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
