import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraRevisionComponent } from './estructura-revision.component';

describe('EstructuraRevisionComponent', () => {
  let component: EstructuraRevisionComponent;
  let fixture: ComponentFixture<EstructuraRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstructuraRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
