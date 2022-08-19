import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '@layout/auth/auth.component';
import { SkeletonComponent } from '@layout/skeleton/skeleton.component';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/sign-in',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('@modules/auth/auth.module').then((m) => m.AuthModule)
      }
    ]
  },
  {
    path: 'inicio',
    component: SkeletonComponent,
    //canActivate: [AuthGuard],
    children:[
      {
        path: '',
        loadChildren: () =>
          import('@modules/home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('@modules/user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'cotizaciones',
        loadChildren: () =>
          import('@modules/cotizacion/cotizacion.module').then((m) => m.CotizacionModule)
      },
      {
        path: 'estructuras',
        loadChildren: () =>
          import('@modules/estructura/estructura.module').then((m) => m.EstructuraModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
