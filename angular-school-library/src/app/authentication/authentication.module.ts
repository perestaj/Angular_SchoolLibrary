import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationEffects } from './state/authentication.effects';
import { reducer } from './state/authentication.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationFacade } from './state/authentication.facade';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    StoreModule.forFeature('authentication', reducer),
    EffectsModule.forFeature([AuthenticationEffects])
  ],
  declarations: [LoginComponent],
  providers: [AuthenticationService, AuthenticationFacade]
})
export class AuthenticationModule {}
