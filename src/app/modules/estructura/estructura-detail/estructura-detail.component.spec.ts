import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraDetailComponent } from './estructura-detail.component';

describe('EstructuraDetailComponent', () => {
  let component: EstructuraDetailComponent;
  let fixture: ComponentFixture<EstructuraDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstructuraDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
