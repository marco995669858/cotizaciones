import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstructuraRoutingModule } from './estructura-routing.module';
import { SharedModule } from '@shared/shared.module';
import { EstructuraListComponent } from './estructura-list/estructura-list.component';
import { EstructuraDetailComponent } from './estructura-detail/estructura-detail.component';
import { EstructuraRevisionComponent } from './estructura-revision/estructura-revision.component';


@NgModule({
  declarations: [
    EstructuraListComponent,
    EstructuraDetailComponent,
    EstructuraRevisionComponent
  ],
  imports: [
    SharedModule,
    EstructuraRoutingModule
  ]
})
export class EstructuraModule { }
