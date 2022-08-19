import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionFlowComponent } from './cotizacion-flow.component';

describe('CotizacionFlowComponent', () => {
  let component: CotizacionFlowComponent;
  let fixture: ComponentFixture<CotizacionFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizacionFlowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
