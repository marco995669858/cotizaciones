import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';

import { CotizacionRoutingModule } from './cotizacion-routing.module';
import { CotizacionListComponent } from './cotizacion-list/cotizacion-list.component';
import { CotizacionDetailComponent } from './cotizacion-detail/cotizacion-detail.component';
import { CotizacionFlowComponent } from './cotizacion-flow/cotizacion-flow.component';


@NgModule({
  declarations: [
    CotizacionListComponent,
    CotizacionDetailComponent,
    CotizacionFlowComponent
  ],
  imports: [
    SharedModule,
    CotizacionRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule
  ]
})
export class CotizacionModule { }
