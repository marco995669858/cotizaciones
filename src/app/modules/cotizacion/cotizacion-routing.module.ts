import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizacionDetailComponent } from './cotizacion-detail/cotizacion-detail.component';
import { CotizacionFlowComponent } from './cotizacion-flow/cotizacion-flow.component';
import { CotizacionListComponent } from './cotizacion-list/cotizacion-list.component';

const routes: Routes = [
  {
    path: '',
    component: CotizacionListComponent
  },
  {
    path: 'cotizacion',
    component: CotizacionDetailComponent,
  },
  {
    path: 'flujo',
    component: CotizacionFlowComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionRoutingModule { }
