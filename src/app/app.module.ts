import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing'
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { OrderService } from './services/order.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { AuthHttp, provideAuth } from 'angular2-jwt';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    NotFoundComponent,
    NoAccessComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'no-access', component: NoAccessComponent }
    ])
  ],
  providers: [
    OrderService,
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    AuthHttp,
    provideAuth({
      headerName: 'Authorization',
      headerPrefix: 'Bearer',
      tokenName: 'token',
      tokenGetter: (() => localStorage.getItem('token')),
    }),

    //Mock backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
