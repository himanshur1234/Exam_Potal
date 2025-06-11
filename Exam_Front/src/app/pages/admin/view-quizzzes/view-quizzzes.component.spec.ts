import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizzzesComponent } from './view-quizzzes.component';

describe('ViewQuizzzesComponent', () => {
  let component: ViewQuizzzesComponent;
  let fixture: ComponentFixture<ViewQuizzzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewQuizzzesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuizzzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
