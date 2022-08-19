import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraListComponent } from './estructura-list.component';

describe('EstructuraListComponent', () => {
  let component: EstructuraListComponent;
  let fixture: ComponentFixture<EstructuraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstructuraListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
