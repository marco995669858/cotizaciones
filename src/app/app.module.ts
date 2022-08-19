import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { AuthComponent } from './layout/auth/auth.component';
import { ANIMATION_MODULE_TYPE, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '@data/services/loader/interceptor.service';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    SkeletonComponent,
    NavigationComponent,
    AuthComponent,
    TopbarComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    NoopAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: ANIMATION_MODULE_TYPE,
      useValue: 'BrowserAnimations'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
