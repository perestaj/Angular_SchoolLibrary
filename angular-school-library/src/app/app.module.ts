import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginInfoComponent } from './navbar/login-info/login-info.component';
import { NavBarComponent } from './navbar/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationInterceptor } from './authentication/authentication.interceptor';
import { BooksModule } from './books/books.module';
import { LoansService } from './loans/loans.service';
import { PublishersService } from './administration/publishers/publishers.service';
import { AuthorsService } from './administration/authors/authors.service';
import { UsersService } from './administration/users/users.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './state/app.effects';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './router/custom-serializer';
import { reducers, metaReducers } from './state/app.reducer';
import { AppFacade } from './state/app.facade';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BooksModule,
    AuthenticationModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([MainEffects])
  ],
  declarations: [
    AppComponent,
    LoginInfoComponent,
    NavBarComponent,
    HomeComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: RouterStateSerializer, useClass: CustomSerializer },
    LoansService,
    PublishersService,
    AuthorsService,
    UsersService,
    AppFacade
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
