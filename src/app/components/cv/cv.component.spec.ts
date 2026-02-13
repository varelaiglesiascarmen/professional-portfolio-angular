import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVComponent } from './cv.component';

describe('CVComponent', () => {
  let component: CVComponent;
  let fixture: ComponentFixture<CVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CVComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
