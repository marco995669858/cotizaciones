import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstructuraDetailComponent } from './estructura-detail/estructura-detail.component';
import { EstructuraListComponent } from './estructura-list/estructura-list.component';

const routes: Routes = [
  {
    path: '',
    component: EstructuraListComponent
  },
  {
    path: 'estructura',
    component: EstructuraDetailComponent
  },
  {
    path: 'estructura/:id',
    component: EstructuraDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstructuraRoutingModule { }
