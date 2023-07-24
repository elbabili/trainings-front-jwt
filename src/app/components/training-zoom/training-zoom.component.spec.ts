import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingZoomComponent } from './training-zoom.component';

describe('TrainingZoomComponent', () => {
  let component: TrainingZoomComponent;
  let fixture: ComponentFixture<TrainingZoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingZoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingZoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
